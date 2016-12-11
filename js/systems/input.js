import { entityHasComponents } from '../utils';

const components = ['inputs'];

export function update(entities, keyboard) {
  return entities.map(entity => {
    if(entityHasComponents(entity, components)) {
      let newEntity = {...entity};
      Object.keys(entity.inputs).forEach(action => {
        const input = entity.inputs[action]
        const keyboardActive = keyboard.active(input.key);
        if(entity.inputs[action].active !== keyboardActive) {
          newEntity.inputs[action].active = keyboardActive;
        }
      });
      return newEntity;
    }
    return entity;
  });
}

