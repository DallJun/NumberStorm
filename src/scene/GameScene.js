var GameLayer = cc.Layer.extend({
	map:null,
	draw:null,
	role:null,
	enemys:null,
	ctor:function () {
		this._super();
		this.initMap();
		this.addDraw(); 
		this.addTouch();
		this.addEnemys();
		amanager.initTileMapLayer(this.map, "layer01");
 
		this.role = new Role(11, 35, this);
		this.role.moveTo(cc.p(28, 20));
//		this.runAction(cc.follow(this.role.sprite));  
		
		pManager.create_world(this, null);
		pManager.createDynamicBody(1, 1, this.role);
		
		//敌人
		this.enemys = new Array(); 
		for(var i=0; i<4; i++){
			var e = new Enemy(i+3, 23, this ,this.role);
			this.enemys.push(e);
			pManager.createDynamicBody(1, 1, e); 
		}
		
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
	},
	addTouch:function(){
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: function(touch, event) {
				return true;
			},
			onTouchEnded: function(touch, event) {
//				var pos = touch.getLocation();
//				cc.log("onTouchEnded at: " + pos.x + " " + pos.y);
//				var tile = utils.pos2tile(pos);
//				cc.log("tile: " + tile.x + " : " + tile.y);
				cc.log("开始耗时!!");
				
				cc.async.parallel([function(cb){
				                	   cc.log("主线程"); 
				                	   amanager.query(cc.p(1,2), cc.p(40,30), function(){});
				                	   cb(null, "AAAA");// 此处代替异步调用方法
				                	   cc.log("over");
				                   }],
				                   function(err, results){
										if(err) throw err;// error 
										cc.log(results);// ["a", "B"]
									});
			}
		}, this);
	},
	addEnemys:function(){
		
	},
	onExit:function(){
		this._super();
		cc.director.getScheduler().unscheduleAllCallbacks();//清楚所有的定时器
		cc.log("游戏结束!");
	}
});

var GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameLayer();
		this.addChild(layer);
	}
});

