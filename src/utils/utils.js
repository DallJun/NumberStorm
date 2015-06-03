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

/**
 * 添加事件监听 
 */
utils.addListener = function(name, fun) {
	var listener = cc.EventListener.create({
		event: cc.EventListener.CUSTOM,
		eventName: name,
		callback: fun
	});
	cc.eventManager.addListener(listener, 2);
	return listener;
}
/**
 * 发送事件
 */
utils.sendEvent = function(name, data) {
	var event = new cc.EventCustom(name);
	if(data){
		event.setUserData(data);
	}
	cc.eventManager.dispatchEvent(event);
}

/**
 * UUID的生产
 */
utils.uuid = function uuid() {
	    var s = [];
	    var hexDigits = "0123456789abcdef";
	    for (var i = 0; i < 36; i++) {
		        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		    }
	    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	    s[8] = s[13] = s[18] = s[23] = "-";
	    var uuid = s.join("");
	    return uuid;
}

