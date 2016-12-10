import PIXI            from 'pixi.js';
import { generateId }  from './utils';
import * as Components from './components';
import * as Sprites    from './sprites';

export const player = user => {
  const startingPosition = [10,11];
  const name = user.name;
  const id = generateId();
  let sprite = Sprites.localPlayer();
  sprite.position.x = startingPosition[0];
  sprite.position.y = startingPosition[1];
  const inputs = {
    'MOVE_FORWARD' : { key: 'w', active: false },
    'MOVE_BACKWARD': { key: 's', active: false },
    'MOVE_LEFT'    : { key: 'a', active: false },
    'MOVE_RIGHT'   : { key: 'd', active: false }
  };
  return {
    id,
    ...Components.input(inputs),
    ...Components.sprite(sprite),
    ...Components.position(startingPosition),
    ...Components.rotation(),
    ...Components.linearVelocity(),
    ...Components.angularVelocity(),
    ...Components.collision(),
    ...Components.camera()
  };
};