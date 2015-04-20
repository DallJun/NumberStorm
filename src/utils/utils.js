var utils = {};

utils.posAdd = function(pos){
	return cc.p(pos.x+game.tileWidth, pos.y+game.tileHeight);
}

utils.posCount = function(pos, num){
	return cc.p(pos.x+num, pos.y+num);
}

utils.tile2Pos = function(pos){
	
	return utils.posCount(cc.p(pos.x*game.tileWidth, game.height - pos.y*game.tileHeight), 16);
}

utils.scale = function(size, num){
	return cc.size(size.width*num, size.height*num);
}