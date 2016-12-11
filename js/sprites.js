
import { rand } from './utils';
import TYPES from './types';


export function player() {
  //const sprite = new PIXI.Sprite(texture);
  //return sprite;
}

export function room(layers) {
  let roomContainer = new PIXI.Container();
  let staticContainer = new PIXI.Container();
  let map = layers["static"];
  let theme = getGroundTheme();
  map.forEach((row_arr, row) => {
    row_arr.forEach((type, col) => {
    	if (type === 0) {
      staticContainer.addChild(createStaticTile(map, type, row, col, theme));
    	}
    });
  });
  roomContainer.addChild(staticContainer);
  return roomContainer;
}

function createStaticTile(map, type, row, col, theme) {
	let id = PIXI.loader.resources['world'].textures;
	if (type === 0) {
		let file = "world-ground-" + theme + "-" + rand(1, 3) + ".png";
		let sprite = new PIXI.Sprite(id[file]);
		sprite.x = 24 * col;
		sprite.y = 24 * row;
		return sprite;
	}
}

function getGroundTheme() {
	return TYPES.TILES.GROUND[rand(0, TYPES.TILES.GROUND.length - 1)];
}