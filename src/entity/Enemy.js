Enemy = Role.extend({
	
	tRole:null,
	
	ctor:function(x, y, target, tRole){
		this._super(x, y, target); 
		this.vel = 50;
		this.tRole = tRole.sprite;
		cc.director.getScheduler().scheduleCallbackForTarget(this, this.query, 3, cc.REPEAT_FOREVER, 1, false);
	},
	/** 
	 * 寻找敌人,追踪敌人
	 */ 
	query:function(){
		if(this) {
			this.moveTo(utils.pos2tile(this.tRole.getPosition()));
		}
	},
	
});