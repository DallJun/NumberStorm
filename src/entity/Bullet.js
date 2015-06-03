Bullet = cc.Class.extend({
	sprite:null,
	live:null,  //生命
	targetNum:null, //目标数字
	belong:null,
	vel:null,
	id:null,
	/**
	 * pos 初始位置  
	 * targetNum 目标数字
	 * belong 所属
	 */
	ctor:function(pos, targetNum, belong){
		this.sprite = new cc.Sprite("res/bullet.png");
		this.belong = belong.sprite;
		this.vel = 30;
		this.sprite.setPosition(pos);
		this.sprite.setScale(0.5);
		this.live = true;
		this.targetNum = targetNum;
	},
	
	spriteUpdate:function(body, dt){
		this.sprite.setPosition(body.getPos());
		var x = this.sprite.x - this.belong.x; 
		var y = this.sprite.y - this.belong.y;
		var r = x*x + y*y;
		//使子弹环绕英雄飞行
		if(r > 1500  && r <1600){ 
			body.setVel(cp.v(-y, x));
			this.sprite.setRotation(Math.atan2(x, y) * 57.29577951 - 90);
		}else if((x*x + y*y) >= 1600){
			body.setVel(cp.v(-x, -y));
			this.sprite.setRotation(Math.atan2(x, y) * 57.29577951 + 180);
		}else {
			body.setVel(cp.v(x, y));
			this.sprite.setRotation(Math.atan2(x, y) * 57.29577951);
		}
	},
	
	getPos:function(){
		return this.sprite.getPosition();
	},
	
	getSize:function(){
		return utils.scale(this.sprite.getContentSize(), 0.5);
	},
	
});