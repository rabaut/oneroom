import { keyboardInput } from '../modules/entity';
import { entityHasComponents } from '../utils';

const components = ['inputs'];

export function update(dispatch, entities, keyboard) {
  const entity = entities.find(entity => entityHasComponents(entity, components));
  if(typeof entity === 'undefined') { return; }
  let nextInputs = {};
  Object.keys(entity.inputs).forEach(action => {
    const input = entity.inputs[action];
    const keyboardActive = keyboard.active(input.key);
    if(input.active !== keyboardActive) {
      nextInputs[action] = {...input, active: keyboardActive};
    }
  });
  if(nextInputs) { dispatch(keyboardInput(entity.id, nextInputs)); }
}

