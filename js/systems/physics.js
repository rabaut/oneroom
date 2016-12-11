import { entityHasComponents } from '../utils';

const friction = .6;
const threshold = .3;

const components = ['linearVelocity', 'angularVelocity', 'rotation', 'position', 'sprite', 'collision'];

export function update(entities) {
  return entities.map(entity => {
    if(entityHasComponents(entity, components)) {
      const { position, rotation, linearVelocity, collision } = entity;

      if(linearVelocity[0] === 0 || linearVelocity[1] === 0) { return entity;}

      linearVelocity[0] += (-1)*Math.sign(linearVelocity[0])*friction;
      linearVelocity[1] += (-1)*Math.sign(linearVelocity[1])*friction;

      if(Math.abs(linearVelocity[0]) < threshold) { linearVelocity[0] = 0; }
      if(Math.abs(linearVelocity[1]) < threshold) { linearVelocity[1] = 0; }

      if(linearVelocity[0] !== 0 || linearVelocity[1] !== 0) {
          entity.position[0] += linearVelocity[0];
          entity.position[1] += linearVelocity[1];
          entity.sprite.position.x += linearVelocity[0];
          entity.sprite.position.y += linearVelocity[1];
      }
    }
    return entity;
  });
}

