import { updateLinearVelocity, updateAngularVelocity } from '../modules/entity';
import { entityHasComponents } from '../utils';

const speed = 1;
const maxSpeed = 4;

const components = ['inputs', 'linearVelocity', 'angularVelocity'];

export function update(dispatch, entities) {
  const movementEntities = entities.filter(entity => entityHasComponents(entity, components));
  for(let a=0; a < movementEntities.length; a++) {
    let entity = movementEntities[a];
    let inputs = entity.inputs;
    Object.keys(inputs).forEach(action => {
      if(!inputs[action].active) { return; }
      let linear  = [0,0];
      if(action === 'moveUp' && entity.linearVelocity[1] > -maxSpeed) {
        linear[1] -= speed;
      }
      if(action === 'moveDown' && entity.linearVelocity[1] < maxSpeed) {
        linear[1] += speed;
      } 
      if(action === 'moveLeft' && entity.linearVelocity[0] > -maxSpeed) {
       linear[0] -= speed;
      }
      if(action === 'moveRight' && entity.linearVelocity[0] < maxSpeed) {
        linear[0] += speed;
      }
      if(linear[0] !== 0 || linear[1] !== 0) {
        let newLinearVelocity = [
          entity.linearVelocity[0] + linear[0],
          entity.linearVelocity[1] + linear[1],
        ];
        dispatch(updateLinearVelocity(entity.id, newLinearVelocity));
      }  
    });
  }
}

