/**
 * 障碍物类,无法穿越的物理
 */
Barrier = cc.Class.extend({
	sprite:null,
	delFlag:null,
	
	ctor:function(sprite){
		this.sprite = sprite;
		this.delFlag = false;
	},
	
	getSize:function(){
		return this.sprite.getContentSize();
	},
	
	getPos:function(){
		return utils.posCount(this.sprite.getPosition(), 16);
	},
	//消除处理操作
	delHandler:function(){
		
	}
});