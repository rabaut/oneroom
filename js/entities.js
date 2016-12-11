import PIXI            from 'pixi.js';
import { generateId }  from './utils';
import { bindings }    from './keyboard';
import * as Components from './components';
import * as Sprites    from './sprites';

export const room = () => {

}

export const player = user => {
  const startingPosition = [10,11];
  const name = user.name;
  const id = generateId();
  let sprite = Sprites.player();
  sprite.position.x = startingPosition[0];
  sprite.position.y = startingPosition[1];
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

