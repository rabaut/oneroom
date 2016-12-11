import { entityHasComponents } from '../utils';

const speed = .8;
const maxSpeed = 10;

const components = ['inputs', 'linearVelocity', 'angularVelocity'];

export function update(entities) {
  return entities.map(entity => {
    if(entityHasComponents(entity, components)) {
      let inputs = entity.inputs;
      Object.keys(inputs).forEach(action => {
        if(!inputs[action].active) { return; }
        if(action === 'moveUp' && entity.linearVelocity[1] > -maxSpeed) {
          entity.linearVelocity[1] -= speed;
        }
        if(action === 'moveDown' && entity.linearVelocity[1] < maxSpeed) {
          entity.linearVelocity[1] += speed;
        } 
        if(action === 'moveLeft' && entity.linearVelocity[0] > -maxSpeed) {
          entity.linearVelocity[0] -= speed;
        }
        if(action === 'moveRight' && entity.linearVelocity[0] < maxSpeed) {
          entity.linearVelocity[0] += speed;
        }
      });
    }
    return entity;
  });
}

