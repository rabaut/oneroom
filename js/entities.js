import { generateId, rand }  from './utils';
import { bindings }    from './keyboard';
import * as Components from './components';
import * as Sprites    from './sprites';
import TYPES           from './types';
import { entityHasComponents } from './utils';
import Rooms                   from '../rooms/rooms.json';

const TILE_SIZE = 24;

export const room = () => {
  let roomContainer = [];

  let layers = Rooms.rooms[rand(0, Rooms.rooms.length - 1)]["layers"]

  let static_map = layers["static"];
  let ground_theme = getGroundTheme();
  let wall_theme = getWallTheme();
  static_map.forEach((row_arr, row) => {
    row_arr.forEach((type, col) => {
      let entity = type === 0 
        ? ground(static_map, row, col, ground_theme) 
        : wall(static_map, row, col, wall_theme);
      roomContainer.push(entity);
    })
  });

  let object_map = layers["object"];
  object_map.forEach((row_arr, row) => {
    row_arr.forEach((type, col) => {
      if (type !== " ") {
        let entity = item(row, col, type);
        roomContainer.push(entity);
      }
    })
  });

  return roomContainer;
}

const ground = (static_map, row, col, ground_theme) => {
  let sprite = Sprites.groundTile(static_map, row, col, ground_theme);
  let entity = {
    id: generateId(),
    type: 'ground',
    ...Components.sprite(sprite),
    ...Components.width(sprite.width),
    ...Components.height(sprite.height),
    ...Components.position([sprite.x, sprite.y])
  };
  return entity;
}

const wall = (static_map, row, col, wall_theme) => {
  let sprite = Sprites.wallTile(static_map, row, col, wall_theme);
  let entity = {
    id: generateId(),
    type: 'wall',
    ...Components.collision(),
    ...Components.sprite(sprite),
    ...Components.width(sprite.width),
    ...Components.height(sprite.height),
    ...Components.position([sprite.x, sprite.y])
  };
  return entity;
}

const item = (row, col, type) => {
  let actualType = convertItemType(type);
  let sprite = Sprites.item(row, col, getItemTheme(actualType), actualType);
  let entity = {
    id: generateId(),
    type: 'item',
    ...Components.sprite(sprite),
    ...Components.width(sprite.width),
    ...Components.height(sprite.height),
    ...Components.position([sprite.x, sprite.y]),
    ...Components.collision()
  };
  return entity;
}

export const player = (stage) => {
  const startingPosition = [10*TILE_SIZE, 11*TILE_SIZE];
  let sprite = Sprites.player(startingPosition);
  let entity = {
    id: generateId(),
    type: 'player',
    ...Components.input(),
    ...Components.sprite(sprite),
    ...Components.width(sprite.width-5),
    ...Components.height(sprite.height-5),
    ...Components.position(startingPosition),
    ...Components.rotation(),
    ...Components.linearVelocity(),
    ...Components.angularVelocity(),
    ...Components.collision(),
    ...Components.camera()
  };
  
  return [entity];
};

function getGroundTheme() {
  return TYPES.TILES.GROUND[rand(0, TYPES.TILES.GROUND.length - 1)];
}

function getWallTheme() {
  return TYPES.TILES.WALL[rand(0, TYPES.TILES.WALL.length - 1)];
}

function getItemTheme(type) {
  return TYPES.ITEMS[type][rand(0, TYPES.ITEMS[type].length - 1)];
}

function convertItemType(type) {
  switch (type) {
    case "a":
      return "ball";
    case "b":
      return "book";
    case "c":
      return "coin";
    case "d":
      return "gem";
    case "e":
      return "heart";
    case "f":
      return "key";
    case "g":
      return "potion";
    case "h":
      return "ring";
    case "i":
      return "shroom";
    case "j":
      return "stone";
  }
}