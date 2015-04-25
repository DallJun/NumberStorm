Enemy = Role.extend({
	
	ctor:function(x, y, target){
		this._super(x, y, target);
		this.vel = 150;
	}
	
	
});