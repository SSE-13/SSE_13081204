"use strict";
const fs = require('fs');
function readFile(path) {
    var map_path = __dirname + path;
    var content = fs.readFileSync(map_path, "utf-8");
    var obj = JSON.parse(content);
    var mapData = obj.map;
    return mapData;
}
function writeFile(data) {
    var map_path = __dirname + "/map.json";
    var obj = JSON.stringify(data);
    fs.writeFileSync(map_path, obj, "utf-8");
}
function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}
function onTileClick(tile) {
    var walkable = mapData[tile.ownedRow][tile.ownedCol] == 0 ? 1 : 0;
    mapData[tile.ownedRow][tile.ownedCol] = walkable;
    tile.setWalkable(walkable);
}
function onSaveClick() {
    var data = JSON.parse(JSON.stringify(mapData));
    saveData.push(data);
    writeFile(data);
    alert("Saved");
    console.log(saveData);
}
var save = new render.TextField("Save");
save.x = 222;
var saveData = new Array();
var mapData = readFile("/map.json");
//alert("mapData :"+JSON.stringify(mapData));
saveData.push(JSON.parse(JSON.stringify(mapData)));
var renderCore = new render.RenderCore();
var eventCore = new events.EventCore();
eventCore.init();
var container = new render.DisplayObjectContainer();
var editor = createMapEditor();
container.addChild(editor);
container.addChild(save);
renderCore.start(container);
//var renderCore = new render.RenderCore();
//var eventCore = new events.EventCore();
//eventCore.init();
eventCore.register(save, events.displayObjectTextHitTest, onSaveClick);
