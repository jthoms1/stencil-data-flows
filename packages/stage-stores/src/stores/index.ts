export interface Store {
  defaultState?: { [key: string]: any },
  [key: string]: any
}

export function createStore(store: Store) {
  let { defaultState, ...storeMethods } = store;
  let internalState = { ...defaultState };
  let listeners: Function[] = [];

  return {
    ...storeMethods,

    subscribe(func: Function): Function {

      listeners.push(func);
      let isSubscribed = true;
      func(internalState);

      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }

        const index = listeners.indexOf(func);
        listeners.splice(index, 1);

        isSubscribed = false;
      };
    },

    getState() {
      return internalState;
    },

    setState(newState: any) {
      internalState = {
        ...newState
      };
      listeners.forEach(func => func(internalState));
    },
  };
}
