import { updateLinearVelocity, updateAngularVelocity } from '../modules/entity';
import { entityHasComponents } from '../utils';

const speed = .2;
const maxSpeed = 1;

const components = ['inputs', 'linearVelocity', 'angularVelocity'];

export function update(dispatch, entities) {
  const movementEntities = entities.filter(entity => entityHasComponents(entity, components));
  for(let a=0; a < movementEntities.length; a++) {
    for(let b; b < movementEntities[a].inputs.length; b++) {
      const input = movementEntities[a].inputs[b];
      if(!input.active) { return; }
      let linear  = [0,0];
      if(input.action === 'MOVE_FORWARD' && entity.linearVelocity[1] > -maxSpeed) {
        linear[1] -= speed;
      }
      if(input.action === 'MOVE_BACKWARD' && entity.linearVelocity[1] < maxSpeed) {
        linear[1] += speed;
      } 
      if(input.action === 'MOVE_LEFT' && entity.linearVelocity[0] > -maxSpeed) {
       linear[0] -= speed;
      }
      if(input.action === 'MOVE_RIGHT' && entity.linearVelocity[0] < maxSpeed) {
        linear[0] += speed;
      }
      if(linear[0] !== 0 || linear[1] !== 0) {
        let newLinearVelocity = [
          entity.linearVelocity[0] + linear[0],
          entity.linearVelocity[1] + linear[1],
        ];
        dispatch(updateLinearVelocity(id, newLinearVelocity));
      }
    }
  }
}

