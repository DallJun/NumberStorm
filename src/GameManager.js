var AManager = function(){
	var openList = new ArrayList();
	var closeList = new ArrayList();
	this.map = null;
	this.EXPEND = 10;
	this.EXPEND_BEVEL = 14;
	this.layer = null;
	/**
	 * 加在瓦片地图
	 */
	this.initTileMapLayer = function(map, name) {
		this.map = map;
		this.layer = map.getLayer(name);
		this.w = this.layer.getLayerSize().width;
		this.h = this.layer.getLayerSize().height;
	}
	
	/**
	 * 寻找路径
	 */
	this.query = function(start, end){
		openList.clear();
		closeList.clear();
		var start_node = this.createNode(start.x, start.y); 
		var end_node = this.createNode(end.x, end.y);
		openList.add(start_node);
		while(openList.getSize() != 0) { 
			if(openList.isExist(end_node.getPos()) && !this.isObstacle(end_node.getPos())) {
				cc.log("寻找路径成功！");
				var endNode = openList.getNodeByLocation(end_node.getPos());
				var index = endNode;
				var rs = [];
				while(index.parentNode != null){ 
					rs.push(index.getPosition());
					index = index.parentNode;
				}
				rs.push(start_node.getPosition());
				return 	rs.reverse();
			}
			this.astar(end);
		}
		return [];
	}
	
	/**
	 * 比较方法(按照F比较)
	 */
	this.compare = function(node1, node2){
		if(node1.f > node2.f) {
			return 1;
		}else if(node1.f < node2.f){
			return -1;
		}else {
			return 0;
		}
	}
	
	this.astar = function(end) {
		openList.sort(this.compare);//排序
		var node_min = openList.get(0); //拿出最小的节点
		openList.remove(0); //移除选中的节点
		closeList.add(node_min);
		var x = node_min.x;
		var y = node_min.y;
		//判断8个方向的node
		this.handler(x, y-1, node_min, end, this.EXPEND);
		this.handler(x, y+1, node_min, end, this.EXPEND);
		this.handler(x-1, y, node_min, end, this.EXPEND);
		this.handler(x+1, y, node_min, end, this.EXPEND);
		this.handler(x-1, y-1, node_min, end, this.EXPEND_BEVEL);
		this.handler(x-1, y+1, node_min, end, this.EXPEND_BEVEL);
		this.handler(x+1, y+1, node_min, end, this.EXPEND_BEVEL);
		this.handler(x+1, y-1, node_min, end, this.EXPEND_BEVEL);
	}
	/**
	 * 根据情况处理node
	 */
	this.handler = function(x, y, node_min, end, expend) {
		if(x > this.w || x <0 || y<0 || y>this.h){
			return;
		}
		if(!closeList.isExist(cc.p(x,y)) && !this.isObstacle(cc.p(x,y))) {  //是否存在于closelite中
			var node_ = openList.getNodeByLocation(cc.p(x,y));
			if(node_){ //已经存在于openlist里
				if(node_.g > node_min.g) {
					node_.setParent(node_min);
					node_.setGValue(expend); //已经消耗
					node_.setHValue(end, expend); //预计消耗
					node_.setFValue();
					openList.sort(this.compare);//排序
				}
			}else { 
				var node_s = this.createNode(x, y);//需要判断的节点
				node_s.setParent(node_min);
				node_s.setGValue(expend); //已经消耗
				node_s.setHValue(end, expend); //预计消耗
				node_s.setFValue(); //总共消耗
				openList.add(node_s);
			}
		}
	}
	/**
	 * 根据map创建对应的node
	 */
	this.createNode = function(x, y){
		var node = new app.Node(x, y);
//		var gid = this.map.getLayer('layer01').getTileGIDAt(x, y);
//		var p = this.map.getPropertiesForGID(gid);
//		if(p&&p.body == "true") {
//			node.isObstacle = true;
//		}
		node.setTile(this.layer.getTileAt(cc.p(x, y)));
		return node;
	}
	/**
	 * 判断该点是否是障碍物
	 */
	this.isObstacle = function(p) {
		var p = this.map.getPropertiesForGID(this.layer.getTileGIDAt(p));
		if(p&&p.body == "true") {
			return true;
		}else {
			return false;
		}
	}
	
};

var amanager = new AManager();
