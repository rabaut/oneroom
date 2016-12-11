
import { collision } from '../modules/entity';

export default Collision = {
  update(dispatch, collisionEntities, world) {
    collisionEntities.forEach(entity => {
      if(entity.collision !== collisions(entity, possibleCollidables)) {
        dispatch(collision(id, nextCollision));
      }
    });
  },

  collisions(entity, collidables) {
    let collision = {};
    return collision;
  }
}