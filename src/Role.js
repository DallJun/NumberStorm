app.Role = cc.Class.extend({
	sprite:null,
	layer:null,
	draw:null,
	ctor:function(x, y, layer, target){
		this.x = x;
		this.y = y;
		this.layer = layer;
		this.sprite = new cc.Sprite("res/yinxiao.png");
		this.sprite.setScale(0.5);
		var pos = layer.getPositionAt(cc.p(x,y));
		this.sprite.setPosition(pos);
		this.draw = new cc.DrawNode();
		target.addChild(this.draw, 100);
	},

	setPosition:function(newPosOrxValue, yValue){
		this.sprite.setPosition(newPosOrxValue, yValue);
	},
	
	
	/**
	 * 移动到指定位置
	 * @param Pos
	 */
	move:function(x,y, target){
		var self = this;
		self.sprite.stopAllActions();
		var p = app.utils.convert(cc.p(this.sprite.x, this.sprite.y));
		var rs = amanager.query({x:p.x,y:p.y},{x:x,y:y});
		self.draw.clear();
		self.draw.drawCardinalSpline(rs, 0, 100, 1);
		self.draw.setDrawColor(cc.color(255,255,255,255));
		self.draw.drawDot(rs[rs.length-1],16,new cc.Color(0, 255, 0, 255));
		for(var k in rs){
			self.draw.drawDot(rs[k], 6);
		}
		var move = cc.catmullRomTo(4, rs);
		self.sprite.runAction(move);
	}
	
	
});