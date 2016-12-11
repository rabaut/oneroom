import { entityHasComponents } from '../utils';

const friction = .80;
const threshold = .4;

const components = ['linearVelocity', 'angularVelocity', 'rotation', 'position', 'sprite', 'collision'];

export function update(entities) {
  return entities.map(entity => {
    if(entityHasComponents(entity, components)) {
      const { position, rotation, linearVelocity, collision } = entity;

      console.log(linearVelocity);

      if(linearVelocity[0] === 0 && linearVelocity[1] === 0) { return entity;}

      //debugger;
      linearVelocity[0] += (-1)*Math.sign(linearVelocity[0])*friction;
      linearVelocity[1] += (-1)*Math.sign(linearVelocity[1])*friction;

      if(Math.abs(linearVelocity[0]) < threshold) { linearVelocity[0] = 0; }
      if(Math.abs(linearVelocity[1]) < threshold) { linearVelocity[1] = 0; }

      if(linearVelocity[0] !== 0 || linearVelocity[1] !== 0) {
          let x = linearVelocity[0];
          let y = linearVelocity[1];
          let len = (x * x) + (y * y);
          let s = Math.sqrt(len);
          x = x / s;
          y = y / s;
          entity.position[0] += x * 1;
          entity.position[1] += y * 1;
          
          entity.sprite.position.x += x * 1;
          entity.sprite.position.y += y * 1;
      }
    }
    return entity;
  });
}

