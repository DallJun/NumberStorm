var game = {};

game.tileWidth = 32;
game.tileHeight = 32;

game.mapWidth = 30;
game.mapHeight = 20;

game.width = game.tileWidth*game.mapWidth;
game.height = game.tileHeight*game.mapHeight;

cc.log(game.width + " : " + game.height);