export const start = () => ({ type: 'START' })

export const started = () => ({ type: 'STARTED' })

const initialState = {
  starting: false,
  started: false
};

export const gameReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'START':
      return {
        ...state,
        starting: true,
        started: false
      };
    case 'STARTED':
      return {
        ...state,
        starting: false,
        started: true
      };
    default:
      return state;
  }
};
