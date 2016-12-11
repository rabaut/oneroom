export const setVisibility = visibility => ({ type: 'SET_VISIBILITY', visibility });

export const toggleVisibility = key => ({ type: 'TOGGLE_VISIBILITY', key });

const initialState = {
  visibility: { menu: false, dev: false },
}

export const uiReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'SET_VISIBILITY': 
      return { 
        ...state, 
        visibility: { 
          ...state.visibility, 
          ...action.visibility 
        }
      };

    case 'TOGGLE_VISIBILITY': 
      return { 
        ...state, 
        visibility: {
          ...state.visibility, 
          [action.key]: !state.visibility[action.key] 
        }
      };
      
    default: 
      return state;
  }
};
