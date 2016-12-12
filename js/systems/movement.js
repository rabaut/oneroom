import { entityHasComponents } from '../utils';
import { bindings } from '../keyboard';

const acceleration = .1;
const maxSpeed = 1;

const components = ['input', 'linearVelocity', 'angularVelocity'];

export function update(entities, keyboard) {
  return entities.map(entity => {
    if(entityHasComponents(entity, components)) {
      Object.keys(bindings.game).forEach(action => {
        if(!keyboard.active(bindings.game[action])) { return; }
        if(action === 'moveUp' && entity.linearVelocity[1] > -maxSpeed) {
          entity.linearVelocity[1] -= acceleration;
        }
        if(action === 'moveDown' && entity.linearVelocity[1] < maxSpeed) {
          entity.linearVelocity[1] += acceleration;
        }
        if(action === 'moveLeft' && entity.linearVelocity[0] > -maxSpeed) {
          entity.linearVelocity[0] -= acceleration;
        }
        if(action === 'moveRight' && entity.linearVelocity[0] < maxSpeed) {
          entity.linearVelocity[0] += acceleration;
        }
      });
    }
    return entity;
  });
}

