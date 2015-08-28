Hero = Role.extend({
	
	bullets:null,
	dir:null,  //0=不移动,1=上,2=下,3=左,4=右
	clip:null,

	ctor:function(x, y, target){
		this._super(x, y, target);
		this.bullets = [];
		this.addKeyListen();
		this.clip = [1,2,3];
//		this.addListen(this);//开启电脑控制模式
	},
	
	//发射子弹
	fire:function(targetNum){
		if(this.bullets.length >3){
			return;
		}
		var bullet = new Bullet(this.sprite.getPosition() , targetNum, this);
		this.bullets.push(bullet);
		pManager.createDynamicBody(2, this.bullets.length, bullet);
		this.layer.addChild(bullet.sprite, 5);
	},
	/**
	 * 添加键盘监听事件
	 */
	addKeyListen:function(){
		if( 'keyboard' in cc.sys.capabilities ) {
			cc.eventManager.addListener({
				event: cc.EventListener.KEYBOARD,
				onKeyPressed:this.onKeyPressed.bind(this),
				onKeyReleased:this.onKeyReleased.bind(this)
			}, this.layer);
		} else {
			cc.log("KEYBOARD Not supported");
		}
	},
	
	spriteUpdate:function(body, dt){
		this.sprite.setPosition(body.getPos());
		switch (this.dir) {
		case 0:
			body.setVel(cp.v(0,0));
			break;
		case 1:
			body.setVel(cp.v(0,this.vel));
			this.sprite.setRotation(0);
			break;
		case 2:
			body.setVel(cp.v(0,-this.vel));
			this.sprite.setRotation(180);
			break;
		case 3:
			body.setVel(cp.v(-this.vel,0));
			this.sprite.setRotation(270);
			break;
		case 4:
			body.setVel(cp.v(this.vel,0));
			this.sprite.setRotation(90);
			break;
		default:
			break;
		}
	},
	
	onKeyPressed:function(key, event) {
		switch (key) {
		case 74: // 开火
			this.fire(0);
			break;
		case 87:
			this.dir = 1;
			break;
		case 83:
			this.dir = 2;
			break;
		case 65:
			this.dir = 3;
			break;
		case 68:
			this.dir = 4;
			break;
		default:
			break;
		}
	},
	
	onKeyReleased:function(key, event) {
		if(key==87||key==83||key==65||key==68){
			this.dir = 0;
		}
	}
});