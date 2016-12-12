import { generateId, rand }  from './utils';
import { bindings }    from './keyboard';
import * as Components from './components';
import * as Sprites    from './sprites';
import TYPES           from './types';
import { entityHasComponents } from './utils';
import Rooms                   from '../rooms/rooms.json';

const TILE_SIZE = 24;

const bulletSpeed = 5;

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

  let creatureType = getCreatureType();
  object_map.forEach((row_arr, row) => {
    row_arr.forEach((type, col) => {
      if(type === 'z') {
        let entity = creature(row, col, creatureType);
        roomContainer.push(entity);
      }
      else if (type !== " ") {
        let entity = item(row, col, type);
        roomContainer.push(entity);
      }
    })
  });

  return roomContainer;
}

export const ground = (static_map, row, col, ground_theme) => {
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

export const wall = (static_map, row, col, wall_theme) => {
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

export const item = (row, col, type) => {
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

export const creature = (row, col, type) => {
  let sprite = Sprites.creature(row, col, type, getCreatureColor(type));
  let entity = {
    id: generateId(),
    type: 'creature',
    ...Components.sprite(sprite),
    ...Components.width(sprite.width),
    ...Components.height(sprite.height),
    ...Components.position([sprite.x, sprite.y]),
    ...Components.collision(),
    ...Components.health(100)
  };
  return entity;
}

export const bullet = (shooter, direction) => {
  let velocity = [shooter.linearVelocity[0],shooter.linearVelocity[1]];
  let bulletPosition = [shooter.position[0], shooter.position[1]];

  if(direction === 'left') {
    velocity[0] = -bulletSpeed;
    bulletPosition[0] -= 10;
  } else if(direction === 'right') {
    velocity[0] = bulletSpeed;
    bulletPosition[0] += 10;
  } else if(direction === 'up') {
    velocity[1] = -bulletSpeed;
    bulletPosition[1] -= 10;
  } else if(direction === 'down') {
    velocity[1] = bulletSpeed;
    bulletPosition[1] += 10;
  }

  let sprite = Sprites.bullet(bulletPosition);
  let entity = {
    id: generateId(),
    type: 'bullet',
    ...Components.sprite(sprite),
    ...Components.width(sprite.width),
    ...Components.height(sprite.height),
    ...Components.position(bulletPosition),
    ...Components.linearVelocity(velocity),
    ...Components.collision()
  }

  return [entity];
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
    ...Components.camera(),
    ...Components.health(100)
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

function getCreatureType() {
  return Object.keys(TYPES.ENEMIES)[rand(0, Object.keys(TYPES.ENEMIES).length -1)];
}

function getCreatureColor(type) {
  return TYPES.ENEMIES[type][rand(0, TYPES.ENEMIES[type].length -1)];
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