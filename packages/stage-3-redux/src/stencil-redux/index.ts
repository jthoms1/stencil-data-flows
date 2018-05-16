export function connect(
  mapStateToProps,
  mapDispatchToProps
) {
  if (mapStateToProps) {

  }

  if (mapDispatchToProps) {
    mapDispatchToProps(state, props)
  }
}

export function createProvider(storeKey = 'store', subKey?) {
  const subscriptionKey = subKey || `${storeKey}Subscription`;

  return function({ store, children }) {

    let state = {
      [storeKey]: this[storeKey],
      [subscriptionKey]: null
    }



    return children;
  }
};

export default createProvider();



