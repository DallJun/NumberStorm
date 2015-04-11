/**
 * 节点类
 */
app.Node = cc.Class.extend({
	x:null,
	y:null,
	parentNode:null,
	g:null,    //已经消耗的能量
	h:null,		//预计消耗的能量
	f:null,    //消耗能量总和
	tile:null,
	isObstacle:false, //是否是障碍物
	
	ctor:function(x, y, parentNode){
		this.x = x;
		this.y = y;
		this.parentNode = parentNode;
	},
	
	equal:function(node){
		if(this.x == node.x && this.y==node.y) {
			return true;
		}else {
			return false;
		}
	},
	/**
	 * 设置父节点
	 */
	setParent:function(node){
		this.parentNode = node;
	},
	
	getParentGValue:function(){
		if(this.parentNode === null) {
			throw new Error("没有父节点，无法计算G值");
		}
		return this.parentNode.g;
	},
	/**
	 * 设置G值，根据父节点
	 */
	setGValue:function(expend){
		this.g = this.getParentGValue() + expend;
	},
	/**
	 * 设置H值，根据终点
	 * @param endPoint  终点坐标
	 * @param expend    消耗
	 */
	setHValue:function(endPoint,expend){
		this.h = (Math.abs(endPoint.x - this.x) + Math.abs(endPoint.y - this.y))*expend;
	},
	/**
	 * 计算F值
	 */
	setFValue:function(){
		this.f = this.g + this.h;
	}, 
	//获取地图坐标(瓦片地图中的)
	getPos:function(){
		return cc.p(this.x, this.y);
	},
	/**
	 * 获取实际坐标
	 */
	getPosition:function(){
		return this.pos;
	},
	//设置node对应的瓦片地图
	setTile:function(tile){
		this.tile = tile;
		this.pos = tile.getPosition();
	},
});









