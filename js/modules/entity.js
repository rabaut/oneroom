export const updateLinearVelocity  = (id, linearVelocity)  => ({type: 'UPDATE_LINEAR_VELOCITY', id, linearVelocity });

export const collision = (id, collision) => ({type: 'COLLISION', id, collision });

export const updateAngularVelocity = (id, angularVelocity) => ({type: 'UPDATE_ANGULAR_VELOCITY', id, angularVelocity });

export const updatePosition = (id, position)  => ({type: 'UPDATE_POSITION', id, position });
 
export const updateRotation = (id, rotation)  => ({type: 'UPDATE_ROTATION', id, rotation });

export const addEntity = (entity)  => ({type: 'ADD_ENTITY', entity});

export const removeEntity = (id, context) => ({type: 'REMOVE_ENTITY', id, context });

export const keyboardInput = (id, inputs) => ({ type: 'KEYBOARD_INPUT', payload: { id, inputs } });

export const entityReducer = (state = {}, action)  => {
  switch(action.type) {
    case 'ADD_ENTITY': 
      return { 
        ...state, 
        [action.entity.id]: action.entity 
      };

    case 'UPDATE_LINEAR_VELOCITY': 
      return { 
        ...state, 
        [action.id]: { 
          ...state[action.id], 
          linearVelocity: action.linearVelocity 
        }
      };

    case 'UPDATE_ANGULAR_VELOCITY': 
      return { 
        ...state, 
        [action.id]: { 
          ...state[action.id], 
          angularVelocity: action.angularVelocity 
        }
      };

    case 'UPDATE_POSITION': 
      let nextState = { 
        ...state, 
        [action.id]: { 
          ...state[action.id],
          sprite: {
            ...state[action.id].sprite,
            position: {
              x: action.payload.position[0],
              y: action.payload.position[1]
            }
          }
        }
      };

    case 'UPDATE_ROTATION': 
      return { 
        ...state, 
        [action.id]: { 
          ...state[action.id], 
          rotation: action.rotation // Change to sprite.rotation
        }
      };

    case 'COLLISION': 
      return { 
        ...state, 
        [action.id]: { 
          ...state[action.id], 
          collision: action.collision 
        }
      };

    case 'KEYBOARD_INPUT': 
      return { 
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          inputs: { 
            ...state[action.payload.id].inputs, 
            ...action.payload.inputs 
          }
        }
      };

    default: 
      return state;
  }
};