import { entityHasComponents } from '../utils';

const acceleration = 2.1;
const maxSpeed = 9;

const components = ['inputs', 'linearVelocity', 'angularVelocity'];

export function update(entities) {
  return entities.map(entity => {
    if(entityHasComponents(entity, components)) {
      let inputs = entity.inputs;
      Object.keys(inputs).forEach(action => {
        if(!inputs[action].active) { return; }
        let linearAcceleration = [0,0];
        if(action === 'moveUp' && entity.linearVelocity[1] > -maxSpeed) {
          //linearAcceleration[1] = -acceleration;
          entity.linearVelocity[1] -= acceleration;
        }
        if(action === 'moveDown' && entity.linearVelocity[1] < maxSpeed) {
          //linearAcceleration[1] = acceleration;
          entity.linearVelocity[1] += acceleration;
        }
        if(action === 'moveLeft' && entity.linearVelocity[0] > -maxSpeed) {
          //linearAcceleration[0] = -acceleration;
          entity.linearVelocity[0] -= acceleration;
        }
        if(action === 'moveRight' && entity.linearVelocity[0] < maxSpeed) {
          //linearAcceleration[0] = acceleration;
          entity.linearVelocity[0] += acceleration;
        }

        //entity.linearVelocity[0] += linearAcceleration[0];
        //entity.linearVelocity[1] += linearAcceleration[1];
      });
    }
    return entity;
  });
}

