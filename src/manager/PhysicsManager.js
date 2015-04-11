/**
 * Created by Administrator on 13-12-4.
 * 物理世界的管理
 * 动态刚体：角色，技能，
 * 静态刚体：围墙，障碍，道具
 */
$app.game.PhysicsManager = {

    _scene:null,   //当前游戏层
    space:null,

    create_world:function(_scene,config){
        //初始化数据
        this._scene = _scene;//游戏当前场景

        if(!this.space){
            this.space = new cp.Space();
            this.space.gravity = cp.v(0, 0); //重力
            //this.initCollisionHandlers(config); //初始化碰撞处理
            //cp.Body.prototype.sprite = null;  //刚体绑定精灵
        }
        else{
            //清空刚体
            this.clearBodys();
        }
        if(2){//$config.physic.debug) {
            var debugNode = cc.PhysicsDebugNode.create(this.space);
            debugNode.setVisible(true);
            _scene._playlayer.addChild(debugNode, 9999999);
        }
        //this.createWall($app.game.MapManager.getMapSzie());
    },
    createWall:function(size){
        //创建墙壁
        var staticBody = new cp.StaticBody();

        var width = size.width;
        var height = size.height;
        this.walls = [ new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(width,0), 5 ),	// bottom
            new cp.SegmentShape( staticBody, cp.v(0,height), cp.v(width,height), 5),	// top
            new cp.SegmentShape( staticBody, cp.v(0,0), cp.v(0,height), 5),				// left
            new cp.SegmentShape( staticBody, cp.v(width,0), cp.v(width,height),5)	// right
        ];
        for( var i=0; i < this.walls.length; i++ ) {
            var shape = this.walls[i];
            shape.setElasticity(1);
            shape.setFriction(1);
            shape.setCollisionType(SpriteTag.wall);
            shape.group = GroupTag.other;
            shape.sprite = $app.game.createSprite($SpriteType.wall);
            //shape.getBody().sprite = $app.game.createSprite($SpriteType.wall);
            //shape.getBody().setUserData(888888);
            //shape.getBody().testNum = 123456;
            this.space.addStaticShape( shape );
        }
    },
    dynamicBodies: [],
    staticBodies: [],
    createDynamicBody:function(spriteTag,groupTag,sprite){
        //创建刚体，形状
        var pos = sprite.getPos();
        var size = sprite.getSize();

        var body = new cp.Body(1, Infinity);
        body.setPos(cp.v(pos.x,pos.y));
        var shape = new cp.BoxShape(body,size.width,size.height);
        shape.setElasticity(0);     //弹力
        shape.setFriction(0);     //摩擦力
        shape.setCollisionType(spriteTag);
        shape.group = groupTag;
        this.space.addBody(body);
        this.space.addShape(shape);

        body.sprite = sprite || null;
        sprite.shape = shape;
        shape.sprite = sprite;

        this.dynamicBodies.push(body);
    },
    createStaticBody:function(spriteTag,groupTag,sprite){
        //创建刚体，形状
        var pos = sprite.getPos();
        var size = sprite.getSize();

        var body = new cp.StaticBody();
        body.setPos(cp.v(pos.x,pos.y));
        var shape = new cp.BoxShape(body,size.width,size.height);
        shape.setElasticity(0);     //弹力
        shape.setFriction(0);     //摩擦力
        shape.setCollisionType(spriteTag);
        shape.group = groupTag;
        this.space.addStaticShape(shape);

        body.sprite = sprite;
        shape.sprite = sprite;
        sprite.shape = shape;

        this.staticBodies.push(body);
    },
    clearBodys:function(){
        for(var i=0; i<this.dynamicBodies.length;i++) { //刷新精灵位置
            cc.log('clearBodys 1');
            var body1 = this.dynamicBodies[i];
            var sprite = body1.sprite;
            //sprite.delHandler();
            this.space.removeBody(body1);
            this.space.removeShape(sprite.shape);
        }
        this.dynamicBodies.length = 0;
        for(var j=0; j<this.staticBodies.length;j++) {
            var body2 = this.staticBodies[j];
            body2.sprite.delHandler();
            this.space.removeStaticShape(body2.sprite.shape);
        }
        this.staticBodies.length = 0;
        for( var i=0; i < this.walls.length; i++ ) {
            this.space.removeStaticShape(this.walls[i]);
        }
        this.walls.length = 0;
    },
    update:function(dt){
        //更新刚体，回收刚体
        this.space.step(dt);

        var removeShape = [];
        for(var i=0; i<this.dynamicBodies.length;i++) { //刷新精灵位置
            var body1 = this.dynamicBodies[i];
            if(body1.sprite.spriteUpdate(body1,dt)){
                removeShape.push(body1.sprite.shape);
            }
        }
        for(var j=0; j<this.staticBodies.length;j++) {
            var body2 = this.staticBodies[j];

            if(body2.sprite.delFlag){  //删除标志
                body2.sprite.delHandler();
                staticBodies.splice(j,1);j--;
            }
        }

        for(var n=0; n<removeShape.length;n++) {
            var shape = removeShape[n];
            this.space.removeBody(shape.getBody());
            this.space.removeShape(shape);
        }

        this._scene.adjustCamera();
    },

    initCollisionHandlers:function(config){//初始化碰撞事件
        var getSprites = function(arb){
            var sprites = [2];
            if(arb.getA){
                sprites[0] = arb.getA().getBody().sprite;
                sprites[1] = arb.getB().getBody().sprite;
                cc.log('AA list1:'+sprites[0]+' list2:'+sprites[1]);
            }
            else{
                var list = arb.getShapes();
                var i=0;
                for(var n in list){
                    sprites[i++] = list[n].sprite;//.getBody().sprite;
                }
                cc.log('BB list1:'+list[0]+' list2:'+list[1]);
                //$utils.printObj(list[1].getBody(),"list[1].getBody()");
                //cc.log('BB list1.body:'+list[0].getBody()+' list2:'+list[1].getBody());
                //cc.log('BB list1.body.sprite'+list[0].getBody().sprite+' list2:'+list[1].getBody().sprite);
                //cc.log('list[1].getBody().testNum:' + list[1].getBody().testNum);
                //cc.log('list[1].getBody().getUserData():' + list[1].getBody().getUserData());
            }

            return sprites;
        };
        for(var i=0;i<config.length;i++){
            var parse = config[i];
            this.space.addCollisionHandler(parse.TagA, parse.TagB,
                function(arb, space) {
                    var list = getSprites(arb);
                    //list[0].crashHandler(list[1]);
                    //list[1].crashHandler(list[0]);
                    return false;
                },null, null, null
            );
        }
    },
    record_sprite:function(sprite){
        if(sprite.getType() == $SpriteType.role){
            //建立刚体本身的刚体，建立技能刚体
            this.createDynamicBody(SpriteTag.role,GroupTag.player,sprite);
        }
        else if(sprite.getType() == $SpriteType.monster){
            this.createDynamicBody(SpriteTag.monster,GroupTag.monster,sprite);
        }
        else if(sprite.getType() == $SpriteType.rSkill){
            this.createDynamicBody(SpriteTag.rSkill,GroupTag.player,sprite);
        }
        else if(sprite.getType() == $SpriteType.mSkill){
            this.createDynamicBody(SpriteTag.mSkill,GroupTag.monster,sprite);
        }
        else if(sprite.getType() == $SpriteType.rinducZone){
            this.createDynamicBody(SpriteTag.rinducZone,GroupTag.player,sprite);
        }
        else if(sprite.getType() == $SpriteType.minducZone){
            this.createDynamicBody(SpriteTag.minducZone,GroupTag.monster,sprite);
        }
        else if(sprite.createDynamicBody()){ //怪物

        }
        else if(sprite.getType() == $SpriteType.prop){ //道具
            this.createStaticBody(SpriteTag.monster,GroupTag.monster,sprite);
        }
    },
    set_play_layer:function(layer){
        this._play_layer = layer;
    }
};