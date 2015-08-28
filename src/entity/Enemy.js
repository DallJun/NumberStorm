Enemy = Role.extend({
	
	tRole:null,
	searchTime:null,
	
	ctor:function(x, y, target, tRole, time){
		this._super(x, y, target); 
		this.vel = 50; 
		this.tRole = tRole.sprite;
		//随机获取  查询时差
		this.searchTime = Math.random()*4+2;
//		cc.director.getScheduler().scheduleCallbackForTarget(this, this.query, time, cc.REPEAT_FOREVER, 1, false);
		cc.director.getScheduler().scheduleCallbackForTarget(this, this.query, this.searchTime, cc.REPEAT_FOREVER, this.searchTime, false);
//		this.addListen(this);//开启电脑控制模式
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