Role = cc.Class.extend({
	sprite:null,
	layer:null,
	draw:null,
	vel:null,//速度
	locs:null, //需要行走的路径  
	uuid:null, //唯一标示
	
	ctor:function(x, y, target){
		this.x = x;
		this.y = y;
		this.uuid = utils.uuid();
		this.vel = 100;
		this.layer = target;
		this.locs = new LinkList();
		this.sprite = new cc.Sprite("res/role.png");
		this.sprite.setScale(0.5);
		this.sprite.setPosition(utils.tile2Pos(cc.p(x,y)));
		this.draw = new cc.DrawNode();
		target.addChild(this.draw, 5);
		target.addChild(this.sprite, 5);
		var pp = utils.pos2tile(this.sprite.getPosition());
	}, 
	/**
	 * 添加时间监听
	 */
	addListen:function(target){
		utils.addListener(this.uuid, function(event){
			var rs = event.getUserData();
			if(rs){ 
				for(var k in rs){
					target.locs.addNode(rs[k]);
				}
			}
		});
	},
	
	setPosition:function(newPosOrxValue, yValue){
		this.sprite.setPosition(newPosOrxValue, yValue);
	},
	
	getPos:function(){
		return this.sprite.getPosition();
	},
	
	getSize:function(){
		return utils.scale(this.sprite.getContentSize(), 0.5);
	},
	/**
	 * 重画自己,更新自己
	 */
	spriteUpdate:function(body, dt){
		var self = this;
		this.sprite.setPosition(body.getPos());
//		cc.log("update : " + self.uuid);
		if(this.locs.getSize() != 0){ 
			//轮询路径点数组,寻找下一个路径点行走过去
			var node = this.locs.getHeardNode();
			//1.判断自己是否在当前点中
			if(this.checkLoc(this.sprite.getPosition(), node.getPos())){
//				cc.log("取出下一个位置:" + node.toString());
				this.locs.removeHeardNode();
//				cc.log("清楚已经行走过的地点");
			}else{
				//1.取出目标位置
				var target = utils.posCount(utils.tile2Pos(node.getPos()),0);
				var sprite = this.sprite.getPosition();
				var x = target.x - sprite.x; 
				var y = target.y - sprite.y; 
				var r = cc.degreesToRadians(Math.atan2(y, x) * 57.29577951);
				//2.往目标位置移动
				body.setVel(cp.v(Math.cos(r)*this.vel, Math.sin(r)*this.vel));
				this.sprite.setRotation(-(Math.atan2(y, x) * 57.29577951 - 90));
			}
		}else {//停止运动
			body.setVel(cp.v(0,0));
		}
		
	},
	/**
	 * 检查位置是否在原来的位置
	 * @param loc 精灵所处的位置
	 */
	checkLoc:function(loc, pos){
		loc = utils.pos2tile(loc);
		if(utils.isequal(loc, pos)){
			return true;
		}
		return false;
	},
	
	moveTo:function(tp){
		var self = this;
		this.locs.clear();
		//查询路径是耗时操作,需要异步操作
		//获取路径节点
		amanager.query(utils.pos2tile(self.sprite.getPosition()), tp ,function(rs){
			self.drawLocs(rs);
		}, this.uuid);
	},
	/**
	 * 画出自己的路径
	 */
	drawLocs:function(rs){
		if(!rs){
			return;
		}
		this.draw.clear();
		var locs = [];
		for(var k in rs){
			locs[k] = utils.tile2Pos(rs[k].getPos());
		}
		this.draw.drawCardinalSpline(locs, 0, 100, 1);
		this.draw.setDrawColor(cc.color(255,255,255,255));
	}
	
	
});