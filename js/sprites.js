import { rand } from './utils';
import TYPES from './types';


const TILE_SIZE = 24;

export function player(position) {
  let textures = PIXI.loader.resources['creatures'].textures;
  const sprite = new PIXI.Sprite(textures['creature-player-default-1.png']);
  sprite.anchor.y = 0.1;
  sprite.position.x = position[0] * TILE_SIZE;
  sprite.position.y = position[1] * TILE_SIZE;
  return sprite;
}

export function groundTile(map, row, col, theme) {
	let id = PIXI.loader.resources['world'].textures;
	let file = "world-ground-" + theme + "-" + rand(1, 3) + ".png";
	let sprite = new PIXI.Sprite(id[file]);
	sprite.position = setPosition(row,col);
	return sprite;
}

export function wallTile(map, row, col, theme) {
	let id = PIXI.loader.resources['world'].textures;
	let weight = 0;
	if (checkNeighborWest(map, row, col)) {
		weight += 1;
	}
	if (checkNeighborNorth(map, row, col)) {
		weight += 2;
	}
	if (checkNeighborEast(map, row, col)) {
		weight += 4;
	}
	if (checkNeighborSouth(map, row, col)) {
		weight += 8;
	}
	let file = "world-wall-" + theme + "-" + weightToWallSprite(weight) + ".png";
	let sprite = new PIXI.Sprite(id[file]);
	sprite.position = setPosition(row, col);
	return sprite;
}

export function item(row, col, theme, type) {
	let id = PIXI.loader.resources['items'].textures;

	let file = "item-" + type + "-" + theme + ".png";
	let sprite = new PIXI.Sprite(id[file]);
	sprite.anchor.x = -0.25;
	sprite.anchor.y = -0.25;
	sprite.position = setPosition(row, col);
	return sprite;
}



function weightToWallSprite(weight) {
	let r = rand(0,10);
	switch (weight) {
		case 0:
			return "1";
		case 1:
			return "4";
		case 2:
			return "7";
		case 3:
			return "11";
		case 4:
			return "2";
		case 5:
			// maybe 10 - 10% of the time?
			if (r === 0) {
				return "18"
			}
			return "3";
		case 6:
			return "10";
		case 7:
			return "16";
		case 8:
			return "5";
		case 9:
			return "9";
		case 10:
			// maybe 9 - 10% of the time? 
			if (r === 0) {
				return "17"
			}
			return "6";
		case 11:
			return "14";
		case 12:
			return "8";
		case 13:
			return "13";
		case 14:
			return "15";
		case 15:
			return "12";
	}
}

function checkNeighborWest(map, row, col) {
	if (col === 0) {
		return false;
	}
	let neighbor = map[row][col - 1];
	return neighbor === 1;
}

function checkNeighborNorth(map, row, col) {
	if (row === 0) {
		return false;
	}
	let neighbor = map[row - 1][col];
	return neighbor === 1;
}

function checkNeighborEast(map, row, col) {
	if (col === map[0].length - 1) {
		return false;
	}
	let neighbor = map[row][col + 1];
	return neighbor === 1;
}

function checkNeighborSouth(map, row, col) {
	if (row === map.length - 1) {
		return false;
	}
	let neighbor = map[row + 1][col];
	return neighbor === 1;
}

function setPosition(row, col) {
	return { x: 24 * col , y: 24 * row };
}
