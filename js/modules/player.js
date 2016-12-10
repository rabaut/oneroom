export const keyboardInput = (id, inputs) => ({ type: 'KEYBOARD_INPUT', payload: { id, inputs } });

export const playerReducer = (state={}, action) => {
  switch(action.type) {
    case 'KEYBOARD_INPUT': 
      return { 
        ...state, 
        inputs: { 
          ...state.inputs, 
          ...action.payload.inputs 
        }
      };

    default: 
      return state;
  }
}
