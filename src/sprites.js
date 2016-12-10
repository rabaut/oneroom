const screenOriginX = 400;
const screenOriginY = 300;

const NORTH = 0, EAST = 1, SOUTH = 2, WEST = 3;

export function localPlayer() {
  const texture = PIXI.Texture.fromImage('assets/textures/hero.png');
  const sprite = new PIXI.Sprite(texture);
  return sprite;
}

export function world(world) {
  const texture = PIXI.Texture.fromImage('assets/textures/hero.png');
  let spriteContainer = new PIXI.Container();
  world.rooms.forEach(room => {
    spriteContainer.addChild(room(room));
  });

  return spriteContainer;
}

export function room(room) {
  const size = 15;
  const texture = PIXI.Texture.fromImage('assets/textures/shield.png');
  let spriteContainer = new PIXI.Container();
  room.chosenDoors.forEach(chosenDoor => {
    let sprite = new PIXI.Sprite(texture);
    if(chosenDoor.dir === NORTH) {
      sprite.position.x = screenOriginX;
      sprite.position.y = 0;
    } else if(chosenDoor.dir === SOUTH) {
      sprite.position.x = screenOriginX;
      sprite.position.y = 550;
    } else if(chosenDoor.dir === EAST) {
        sprite.position.x = 750;
        sprite.position.y = screenOriginY;
    } else {
        sprite.position.x = 0;
        sprite.position.y = screenOriginY;
    }
    spriteContainer.addChild(sprite);
  });
  return spriteContainer;
}