const defaults = {
  collision: {
    left: false, right: false,
    back: false, front: false,
    top: false, bottom: false
  }
};

export const sprite = (sprite = {}) => ({ sprite })

export const input  = (inputs = {}) => ({ inputs })

export const camera = (camera = {}) => ({ camera })

export const position        = (position = [0,0])               => ({ position });

export const rotation        = (rotation = [0,0])               => ({ rotation });

export const linearVelocity  = (linearVelocity = [0,0])         => ({ linearVelocity });

export const angularVelocity = (angularVelocity = [0,0])        => ({ angularVelocity });

export const collision       = (collision = defaults.collsion)  => ({ collision });

export const gravity         = (gravity={})                     => ({gravity});

export const jump            = (jump={active: false, start: 0}) => ({jump});
