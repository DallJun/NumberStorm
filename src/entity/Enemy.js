Enemy = Role.extend({
	
	tRole:null,
	
	ctor:function(x, y, target, tRole){
		this._super(x, y, target);
		this.vel = 150;
		this.tRole = tRole;
		cc.director.getScheduler().scheduleCallbackForTarget(this, this.query, 1, cc.REPEAT_FOREVER, 1, false );
	},
	
	/**
	 * 寻找敌人,追踪敌人
	 */
	query:function(){
		var self = this;
		this.moveTo(utils.pos2tile(self.tRole.sprite.getPosition()));
	}
	
});