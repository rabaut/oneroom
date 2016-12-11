
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
  map.forEach(row => {
    row.forEach((type, col) => {
    	if (type === 0) {
      staticContainer.addChild(createStaticTile(map, type, row, col));
    	}
    });
  });
  roomContainer.addChild(staticContainer);
  return roomContainer;
}

function createStaticTile(map, type, row, col) {
	let id = PIXI.loader.resources["../assets/textures/sheets/world.json"].textures;
	if (type === 0) {
		let file = "world-ground-" + getGroundTheme() + "-" + rand(1, 3) + ".png";
		return new PIXI.Sprite(id[file]);
	}
}

function getGroundTheme() {
	return TYPES.TILES.GROUND[rand(0, TYPES.TILES.GROUND.length - 1)];
}