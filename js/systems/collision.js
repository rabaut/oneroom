
import { collision } from '../modules/entity';

const Collision = {
  update(dispatch, entities, collisionEntities, world) {
    collisionEntities.forEach(id => {
      const entity = entities[id];
      //const chunk = world.getChunkAt(entity.body.position).mesh;
      const nextCollision = this.collisions(entity.mesh, [world.mesh]);
      if(entity.collision !== collision) { // do actual deep check or some other way to know it needs to update
        dispatch(collision(id, nextCollision));
      }
    });
  },

  collisions(entity, collidables) {
    let collision = {};
    return collision;
  }
}

export default Collision;
