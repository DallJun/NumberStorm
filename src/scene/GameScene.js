var GameLayer = cc.Layer.extend({
	map:null,
	draw:null,
	role:null,
	enemys:null,
	barriers:null,
	ctor:function () {
		this._super();
		this.initMap(); //加载地图
		this.addDraw();  //添加绘画层
//		this.addTouch();  //添加触屏事件
		this.addEnemys(); //添加敌人
		amanager.initTileMapLayer(this.map, "layer01");
		this.role = new Hero(10, 10, this);
		pManager.create_world(this, null);
		pManager.createDynamicBody(1, 1, this.role);
//		this.role.fire(1);
		//敌人
		this.enemys = new Array(); 
		for(var i=0; i<3; i++){
			var e = new Enemy(i+12, 2, this ,this.role, i+1);
			this.enemys.push(e);
			pManager.createDynamicBody(1, i+2, e); 
		}
		this.addWall();   //添加游戏中的墙壁
//		this.addListen();
		this.scheduleUpdate();
	}, 
	
	update:function(dt){
		var self = this;
		pManager.update(dt);
	},
	/**
	 * 加载地图
	 */
	initMap:function(){
		this.map = new cc.TMXTiledMap("res/map/new_map.tmx"); 
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
	},
	addTouch:function(){
		var self = this;
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: function(touch, event) {
				return true;
			},
			onTouchEnded: function(touch, event) {
				var pos = touch.getLocation();
				cc.log("onTouchEnded at: " + pos.x + " " + pos.y);
				var tile = utils.pos2tile(pos);
				cc.log("tile: " + tile.x + " : " + tile.y);
				self.role.moveTo(tile);
			}
		}, this);
	},
	addEnemys:function(){
		
	},
	onExit:function(){
		this._super();
		cc.director.getScheduler().unscheduleAllCallbacks();//清楚所有的定时器
		cc.log("游戏结束!");
	},
	addWall:function(){
		this.barriers = [];
		var layer = this.map.getLayer("layer01");
		var x = layer.getLayerSize().width;
		var y = layer.getLayerSize().height;
		for(var i=0; i<x; i++){
			for(var j=0;j<y; j++){
				var gid = layer.getTileGIDAt(i,j);
				var body = this.map.getPropertiesForGID(gid);
				var tile = layer.getTileAt(cc.p(i,j)); 
				if(body&&body.body == "true") {
					var bar = new Barrier(tile)
					pManager.createStaticBody(100, 100, bar);
					this.barriers.push(bar);
				}
			}
		}
	}
});

var GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameLayer();
		this.addChild(layer);
	}
});

