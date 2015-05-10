Bullet = cc.Class.extend({
	sprite:null,
	live:null,  //生命
	targetNum:null, //目标数字
	
	ctor:function(){
		this.sprite = new cc.Sprite("res/bullet.png");
		this.live = true;
	},
	
	getPos:function(){
		return this.sprite.getPosition();
	},
	
	getSize:function(){
		return this.sprite.getContentSize();
	},
	
	
	
});