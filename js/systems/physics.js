import { entityHasComponents } from '../utils';

const friction  = 0.50;
const speed     = 2;
const threshold = 0.1;

const components = ['linearVelocity', 'angularVelocity', 'rotation', 'position', 'sprite', 'collision'];

export function update(entities) {
  return entities.map(entity => {
    if(entityHasComponents(entity, components)) {
      const { position, rotation, linearVelocity, collision } = entity;

      if(linearVelocity[0] === 0 && linearVelocity[1] === 0) { return entity;}

      let s = Math.sqrt((linearVelocity[0] * linearVelocity[0]) + (linearVelocity[1] * linearVelocity[1]));

      linearVelocity[0] /= s;
      linearVelocity[1] /= s;

      //linearVelocity[0] -= linearVelocity[0]*friction;
      //linearVelocity[1] -= linearVelocity[1]*friction;

      //if(Math.abs(linearVelocity[0]) < threshold) { linearVelocity[0] = 0; }
      //if(Math.abs(linearVelocity[1]) < threshold) { linearVelocity[1] = 0; }

      let velX = linearVelocity[0] * speed;
      let velY = linearVelocity[1] * speed;

      let nextX = entity.position[0] + velX;
      let nextY = entity.position[1] + velY;

      entity.linearVelocity[0] = 0;
      entity.linearVelocity[1] = 0;
      

      this.entities.forEach(entity => {
        if(entity.position.x ..)
        {
          // Will collide so dont apply velocity
          return entity;
        }
      })

      entity.position[0] += velX;
      entity.position[1] += velY;

      entity.sprite.position.x = entity.position[0];
      entity.sprite.position.y = entity.position[1];
    }
    return entity;
  });
}

