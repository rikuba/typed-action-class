export function Action<T extends string>(type: T) {
  return class Action<P = undefined> {
    type: T;
    payload: P;

    constructor(payload: P) {
      return { type, payload } as this;
    }
  };
}

export type UniteActions<ActionModule extends { [name: string]: { prototype: any } }> =
  ActionModule[keyof ActionModule]['prototype'] |
  { type: '' }; // for <https://github.com/reactjs/redux/issues/2709>
