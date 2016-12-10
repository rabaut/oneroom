export const keyboardInput = (id, inputs)       => ({ type: 'KEYBOARD_INPUT', payload: { id, inputs } });

export const moveItem = (id, oldSlot, newSlot)  => ({ type: 'MOVE_ITEM', context: 'CLIENT', payload: { id, oldSlot, newSlot } });

export const selectPlayer = player              => ({ type: 'SELECT_PLAYER', context: 'CLIENT', payload: { player } });

export const playerReducer = (state={}, action) => {
  switch(action.type) {
    case 'SELECT_PLAYER'  : return action.payload.player;
    case 'KEYBOARD_INPUT' : return { ...state, inputs: { ...state.inputs, ...action.payload.inputs }};
    case 'MOVE_ITEM':
      return {
        ...state,
        inventory: {
          ...state.inventory,
          [action.payload.newSlot]: state.inventory[action.payload.oldSlot],
          [action.payload.oldSlot]: state.inventory[action.payload.newSlot]
        }
      };
    default: return state;
  }
}
