export function createStore(defaultState: { [key: string]: any }) {
  let internalState = { ...defaultState };
  let listeners: Function[] = [];

  return {
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

    action(action) {
			function apply(result) {
				this.setState(result, false, action);
			}

			return function() {
				let args = [internalState];
				for (let i=0; i<arguments.length; i++) args.push(arguments[i]);
				let ret = action.apply(this, args);
				if (ret!=null) {
					if (ret.then) return ret.then(apply);
					return apply(ret);
				}
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

export function connect(storeValue, actions) {

}
