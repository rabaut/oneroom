import THREE from 'three';

import { collision } from 'shared/modules/entity';

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
    let collision = {
      right: false, left: false,
      top: false, bottom: false,
      front: false, back: false
    };
    const originPoint = entity.position.clone();
    for (let vertexIndex = 0; vertexIndex < entity.geometry.vertices.length; vertexIndex++)
  	{
  		const localVertex = entity.geometry.vertices[vertexIndex].clone();
  		const globalVertex = localVertex.applyMatrix4( entity.matrix );
  		const directionVector = globalVertex.sub( entity.position );

  		const ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
  		const collisionResults = ray.intersectObjects( collidables );
  		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() + 20 ) {
        if(vertexIndex === 4) { collision.front = true; }
        if(vertexIndex === 5 ) { collision.back = true; }
        if(vertexIndex === 0 || vertexIndex === 1) { collision.right = true; }
        if(vertexIndex === 4 || vertexIndex === 5) { collision.left = true; }
        if(vertexIndex === 6) { collision.bottom = true; }
      }
  	}
    return collision;
  }
}

export default Collision;
