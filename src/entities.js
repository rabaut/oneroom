import PIXI                  from 'pixi.js';
import { generateId }        from 'shared/utils';
import * as ClientComponents from './components';
import * as Components       from 'shared/components';
import * as Sprites          from './sprites';

export const localPlayer = user => {
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
    ...ClientComponents.input(inputs),
    ...ClientComponents.sprite(sprite),
    ...Components.position(startingPosition),
    ...Components.rotation(),
    ...Components.linearVelocity(),
    ...Components.angularVelocity(),
    ...Components.collision(),
    ...ClientComponents.camera()
  };
};

export const remotePlayer = () => {
  return {};
}
