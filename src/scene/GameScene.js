var GameLayer = cc.Layer.extend({
	map:null,
	draw:null,
	role:null,
	ctor:function () {
		this._super();
		this.initMap();
		this.addDraw();
		amanager.initTileMapLayer(this.map, "layer01");
		
		this.role = new Role(8, 32,this);
		this.role.move(13, 23);
		this.runAction(cc.follow(this.role.sprite)); 
		
		pManager.create_world(this, null);
		pManager.createDynamicBody(1, 1, this.role);
		
		this.scheduleUpdate();
	},
	update:function(dt){
		pManager.update(dt);
	},
	
	/**
	 * 加载地图
	 */
	initMap:function(){
		this.map = new cc.TMXTiledMap("res/map/map01.tmx");
		this.addChild(this.map, 1, "map");
	},
	/**
	 * 添加绘画层
	 */
	addDraw:function(){
		this.draw = new cc.DrawNode();
		var layer = this.map.getLayer("layer01");
		var x = layer.getLayerSize().width;
		var y = layer.getLayerSize().height;
		for(var i=0; i<x; i++){
			for(var j=0;j<y; j++){
				var gid = layer.getTileGIDAt(i,j);
				var body = this.map.getPropertiesForGID(gid);
				var pos = layer.getPositionAt(cc.p(i,j)); 
				if(body&&body.body == "true") {
					this.draw.drawRect(pos, utils.posAdd(pos), cc.color(255, 0, 0, 255), 1, cc.color(0, 0, 0, 255));
				}else {
					this.draw.drawRect(pos, utils.posAdd(pos), cc.color(0, 0, 0, 0), 1, cc.color(0, 140, 0, 255));
				}
			}
		}
		this.addChild(this.draw, 2 , "draw");
	}
});

var GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameLayer();
		this.addChild(layer);
	}
});

