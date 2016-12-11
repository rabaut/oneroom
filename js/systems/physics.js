import { updatePosition } from '../modules/entity';
import { entityHasComponents } from '../utils';

const friction = .05;
const threshold = .1;

const components = ['linearVelocity', 'angularVelocity', 'rotation', 'position', 'sprite', 'collision'];

export function update(dispatch, entities) {
  const physicsEntities = entities.filter(entity => entityHasComponents(entity, components));
  for(let a=0; a < physicsEntities.length; a++) {
    const entity = physicsEntities[a];
    const { position, rotation, linearVelocity, collision } = entity;

    if(collision.right || collision.left || collision.top || collision.bottom ||
       collision.front || collision.back) {
      //return;
    }

    linearVelocity[0] += (-1)*Math.sign(linearVelocity[0])*friction;
    linearVelocity[1] += (-1)*Math.sign(linearVelocity[1])*friction;

    if(Math.abs(linearVelocity[0]) < threshold) { linearVelocity[0] = 0; }
    if(Math.abs(linearVelocity[1]) < threshold) { linearVelocity[1] = 0; }

    if(linearVelocity[0] !== 0 || linearVelocity[1] !== 0) {
      let newPosition = [
        position[0] + linearVelocity[0],
        position[1] + linearVelocity[1]
      ];
      dispatch(updatePosition(id, newPosition));
    }
  }
}

