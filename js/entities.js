import PIXI            from 'pixi.js';
import { generateId }  from './utils';
import { bindings }    from './keyboard';
import * as Components from './components';
import * as Sprites    from './sprites';


export const room = () => {
  const id = generateId();
  let sprite = Sprites.room();
  return {
    id,
    ...Components.sprite(sprite)
  };
};

export const player = () => {
  const startingPosition = [10,11];
  const id = generateId();
  let sprite = Sprites.player(startingPosition);
  return {
    id,
    ...Components.input(),
    ...Components.sprite(sprite),
    ...Components.position(startingPosition),
    ...Components.rotation(),
    ...Components.linearVelocity(),
    ...Components.angularVelocity(),
    ...Components.collision(),
    ...Components.camera()
  };
};

