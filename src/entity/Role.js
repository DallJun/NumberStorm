Role = cc.Class.extend({
	sprite:null,
	layer:null,
	draw:null,
	vel:null,//速度
	locs:null, //需要行走的路径
	ctor:function(x, y, target){
		this.x = x;
		this.y = y;
		this.locs = [];
		this.sprite = new cc.Sprite("res/role.png");
		this.sprite.setScale(0.5);
		this.sprite.setPosition(utils.tile2Pos(cc.p(x,y)));
		this.draw = new cc.DrawNode();
		target.addChild(this.draw, 5);
		target.addChild(this.sprite, 5);
		var pp = utils.pos2tile(this.sprite.getPosition());
		cc.log(pp.x+":" + pp.y);
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
		if(this.locs.length != 0){
			//轮询路径点数组,寻找下一个路径点行走过去
			//1.判断自己是否在当前点中
			
			//2.不在当前点,开始前往下一个点
			body.setVel(cp.v(0, 30));
		}
	},
	/**
	 * 检查位置是否在原来的位置
	 * @param loc 
	 */
	checkLoc:function(loc){
		
		return false;
	},
	/**
	 * 移动到指定位置
	 * @param Pos
	 */
	move:function(x,y){
		var self = this;
		self.sprite.stopAllActions();
		var rs = amanager.query(cc.p(self.x, self.y),cc.p(x,y));
		if(!rs){
			return;
		}
		self.draw.clear();
		self.draw.drawCardinalSpline(rs, 0, 100, 1);
		self.draw.setDrawColor(cc.color(255,255,255,255));
		self.draw.drawDot(rs[rs.length-1],16,new cc.Color(0, 255, 0, 255));
		for(var k in rs){
			self.draw.drawDot(rs[k], 6);
		}
		var move = cc.catmullRomTo(4, rs);
		self.sprite.runAction(move);
	}
	
	
});