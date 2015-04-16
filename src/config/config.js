var game = {};

game.tileWidth = 32;
game.tileHeight = 32;

game.mapWidth = 60;
game.mapHeight = 40;

game.width = game.tileWidth*game.mapWidth;
game.height = game.tileHeight*game.mapHeight;

cc.log(game.width + " : " + game.height);