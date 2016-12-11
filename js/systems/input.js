import { keyboardInput } from '../modules/player';

export function update(dispatch, player, keyboard) {
  const { inputs } = player;
  let nextInputs = {};
  Object.keys(inputs).forEach(cmd => {
    const input = inputs[cmd];
    const active = keyboard.keys[input.key];
    if(active !== input.active) {
      nextInputs[cmd] = {...input, active};
    }
  });
  if(nextInputs) { dispatch(keyboardInput(nextInputs)); }
}

