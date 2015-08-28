var ArrayList = function(){
	
	var arr = new Array();
	
	this.add = function(node){
		arr.push(node);
	};
	
	this.get = function(index) {
		if(arr.length == 0){
			return;
		}
		return arr[index];
	};
	
	this.remove = function(index){
		if(index<0 || index >= this.getSize()){
			return;
		} else {
			arr = arr.slice(0,index).concat(arr.slice(index+1, arr.length));
		}
	};
	
	this.getSize = function(){ 
		return arr.length;
	};
	
	/**
	 * 快速排序
	 * compare(a, b) : 比较函数 返回：-1(a<b),0(a=b),1(a>b) 
	 */
	this.sort = function(compare){
		this.sortOne(arr, 0, this.getSize()-1, compare);
	};
	/**
	 * 一次排序
	 */
	this.sortOne = function(arr, i , j, compare){
//		cc.log("开始新的区间: ["+ i + "-" + j + "]"); 
		if(i == j || i>=j){
//			cc.log("结束的区间"); 
			return;
		}
		var start = i;
		var end = j;
		var x = i;//坑 
		var flag = true;
		do{
			if(flag){
				//从最后一个 开始比较
				if(compare(arr[x], arr[j]) == 1 || compare(arr[x],arr[j]) == 0) {
					var z = arr[x];
					arr[x] = arr[j];
					arr[j] = z;
					x = j;
					flag = false;
				}else{
					j--;
				}
			}else {
				if(compare(arr[x], arr[i+1]) == -1){
					var z = arr[x];
					arr[x] = arr[i+1];
					arr[i+1] = z;
					x = i+1;
					flag = true;
				}else {
					i++;
				} 
			}
		}while((i+1) != j && i != j);
		if(x == 0){
			this.sortOne(arr, start+1, end, compare); 
		}else if(x == end){
			this.sortOne(arr, start, end-1, compare);
		}else {
			this.sortOne(arr, start, x-1, compare);
			this.sortOne(arr, x+1, end, compare);
		}
	}
	/**
	 * 列表是否包含此元素
	 * return true=包含 false＝不包含
	 */
	this.isContain = function(node){
		for(var k in arr) {
			if(node.equal(arr[k])){
				return arr[k];
			}
		}
		return null;
	}
	
	this.getNodeByLocation = function(p) {
		for(var k in arr) {
			if(p.x == arr[k].x && p.y == arr[k].y){
				return arr[k];
			}
		}
		return null;
	}
	
	this.isExist = function(p){
		for(var k in arr) {
			if(p.x == arr[k].x && p.y == arr[k].y){
				return true
			}
		}
		return false;
	}
	
	/**
	 * 清空数组
	 */
	this.clear = function(){
		arr.length = 0;
	}
	
}













