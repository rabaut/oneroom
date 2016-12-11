import { updateLinearVelocity, updateAngularVelocity } from '../modules/entity';

const speed = .2;
const maxSpeed = 1;

export function update(dispatch, movementEntities) {
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
};