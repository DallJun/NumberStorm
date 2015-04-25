var utils = {};

utils.posAdd = function(pos){
	return cc.p(pos.x+game.tileWidth, pos.y+game.tileHeight);
}

utils.posCount = function(pos, num){
	return cc.p(pos.x+num, pos.y+num);
}

utils.tile2Pos = function(pos){
	return utils.posCount(cc.p((pos.x)*game.tileWidth, game.height - (pos.y+1)*game.tileHeight), 16);
}

utils.scale = function(size, num){ 
	return cc.size(size.width*num, size.height*num);
}

utils.pos2tile = function(pos){
//	pos = utils.posCount(pos, -16);
	var x = Math.floor(pos.x/game.tileWidth);
	var y = Math.floor((game.height - (pos.y))/game.tileHeight);
	return cc.p(x,y);
}

utils.isequal = function(pos1 ,pos2){
	if(pos1.x == pos2.x && pos1.y == pos2.y){ 
		return true;
	}
	return false;
}

utils.show = function(obj){
	for(var k in obj){
		if(typeof(obj[k]) == "function"){
			cc.log(k + " : function")
		}else {
			cc.log(k + " : " + obj[k])
		}
	}
}
