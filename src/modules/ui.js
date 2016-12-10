export const setVisibility    = visibility => ({ type: 'SET_VISIBILITY', context: 'CLIENT', visibility });

export const toggleVisibility = key        => ({ type: 'TOGGLE_VISIBILITY', context: 'CLIENT', key });

const initialUI = {
  visibility: { menu: false, dev: false },
}

export const uiReducer = (state=initialUI, action) => {
  switch(action.type) {
    case 'SET_VISIBILITY'    : return { ...state, visibility: { ...state.visibility, ...action.visibility }};
    case 'TOGGLE_VISIBILITY' : return { ...state, visibility: { ...state.visibility, [action.key]: !state.visibility[action.key] }};
    default: return state;
  }
};
