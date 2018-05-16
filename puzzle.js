var mashtab = 1;
var grid = 50*mashtab;
var width = 1600*mashtab;
var height = 1000*mashtab;
var game = new Phaser.Game(width, height, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

var items;
var total = 0;
var itemsTotal = 0;
var floor;
var indexImg = getRandomInt(1,7);

sizeImage = {
    height: 600*mashtab,
    width: 400*mashtab
}
var fon;
var PIECE_WIDTH = 200,
    PIECE_HEIGHT = 200,
    BOARD_COLS,
    BOARD_ROWS;

function preload() {
    game.load.image('someImg', 'cat'+indexImg+'.jpg');
    game.load.image('fon', 'fon.jpg');
    game.load.spritesheet('cat', 'cat'+indexImg+'.jpg', PIECE_WIDTH, PIECE_HEIGHT);
    PIECE_WIDTH*=mashtab;
    PIECE_HEIGHT*=mashtab;

}

function updateCounter() {

    total++;

}
function create() {
    var someImg = game.add.sprite(0, 0,"someImg");
    fon = game.add.tileSprite(0, 0, width, height,"fon");
    sizeImage.width = someImg.width*mashtab;
    sizeImage.height = someImg.height*mashtab;
    console.log(someImg.width);
    //timer
    timer = game.time.create(false);
    timer.loop(1000, updateCounter, this);
    timer.start();

    floor = new Phaser.Rectangle(game.world.centerX-0.5*sizeImage.width,game.world.centerY-0.5*sizeImage.height,sizeImage.width, sizeImage.height);
    createPuzzle();



}

function render() {

    game.debug.text(': ' + itemsTotal, 74, 80);
    game.debug.geom(floor,'rgba(255,204,204,0.1)');
    game.debug.text('Time: ' + total, 32, 64);
    if(itemsTotal==0){
        alert('You win! \n Your time: '+total);

        location.reload();
    }
    if(total==660){
        alert('You lose!');

        location.reload();
    }
}

function createPuzzle() {
    BOARD_ROWS = Math.floor((sizeImage.width) / PIECE_WIDTH);
    BOARD_COLS = Math.floor((sizeImage.height) / PIECE_HEIGHT);
    // itemsTotal = BOARD_COLS*BOARD_ROWS;


    items = game.add.group();
    var item;

    for (var j = 0;j < BOARD_COLS; j++)
        for (var i = 0; i < BOARD_ROWS; i++)
        {
            item = items.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, "cat", itemsTotal++ );
            item.name = 'block ' + i+' '+j;
			console.log(item.name);
            item.id = i+j*BOARD_ROWS;
            item.inputEnabled = true;
            item.i = i;
            item.j = j;
            item.x =  grid*getRandomInt(0,((width-PIECE_WIDTH)/grid));
            item.y =  grid*getRandomInt(0,((height-PIECE_HEIGHT)/grid));
            item.scale.set(1*mashtab);
            item.input.enableDrag();

            item.input.enableSnap(grid, grid, false, true);

            item.events.onDragStop.add(onPlace, this);

        }
}
function onPlace(item,pointer) {
    imgPoint={
        x:game.world.centerX-0.5*sizeImage.width+item.i*PIECE_HEIGHT,
        y:game.world.centerY-0.5*sizeImage.height+item.j*PIECE_WIDTH
    }


    console.log(imgPoint.x,imgPoint.y,item.x,item.y,item.name);
    if((imgPoint.x-item.x<grid/5)&&(imgPoint.y-item.y<grid/5)&&(imgPoint.x-item.x>-grid/5)&&(imgPoint.y-item.y>-grid/5)) {
        itemsTotal--;
        item.inputEnabled = false;
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

