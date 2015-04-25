/**
 * 列队
 */
var LinkList = function(){
	var arr = new ArrayList();
	
	this.addNode = function(node){
		arr.add(node);
	}
	
	this.getLastNode = function(){
		var n = arr.get(arr.getSize()-1);
		arr.remove(arr.getSize()-1);
		return n;
	}
	
	this.getSize = function(){
		return arr.getSize();
	}
	
	this.getHeardNode = function(){
		var n = arr.get(0)
		return n;
	}
	this.removeHeardNode = function(){
		arr.remove(0);
	}
	
}
