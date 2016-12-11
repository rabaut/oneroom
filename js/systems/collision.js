import { entityHasComponents } from '../utils';

export const components = ['position', 'collision', 'sprite'];

export function update(dispatch, entities, world) {
  const collisionEntities = entities.filter(entity => entityHasComponents(entity, components));
  collisionEntities.forEach(entity => {
    if(entity.collision !== collisions(entity, possibleCollidables)) {
    }
  });
}

export function collisions(entity, collidables) {
  let collision = {};
  return collision;
}

