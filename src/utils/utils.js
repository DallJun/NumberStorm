var utils = {};

utils.posAdd = function(pos){
	return cc.p(pos.x+game.tileWidth, pos.y+game.tileHeight);
}
