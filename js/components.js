import { bindings } from './keyboard';

export const sprite = (sprite = {}) => ({ sprite })

export const input  = (input = null) => ({ input })

export const camera = (camera = null) => ({ camera })

export const position = (position = [0,0]) => ({ position });

export const rotation = (rotation = [0,0]) => ({ rotation });

export const width = (width = 0) => ({ width });

export const height = (height = 0) => ({ height });

export const health = (health = 4) => ({ health });

export const linearVelocity = (linearVelocity = [0,0]) => ({ linearVelocity });

export const angularVelocity = (angularVelocity = [0,0]) => ({ angularVelocity });

export const collision = (collision = {})  => ({ collision });

export const jump  = (jump={active: false, start: 0}) => ({jump});

export const ai = (ai = {mode: 'pace', duration: 2500, currDir: 'right', currTime: -1}) => ({ ai });

