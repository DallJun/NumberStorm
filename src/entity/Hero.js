Hero = Role.extend({
	
	bullets:null,
	
	ctor:function(x, y, target){
		this._super(x, y, target);
		this.bullets = [];
	},
	
	//发射子弹
	fire:function(targetNum){
		var bullet = new Bullet(this.sprite.getPosition() , targetNum, this);
		pManager.createDynamicBody(10, 10, bullet);
		this.layer.addChild(bullet.sprite, 5);
	},
	
	
	
	
	
});