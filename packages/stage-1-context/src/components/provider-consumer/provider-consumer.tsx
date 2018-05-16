import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'context-consumer'
})
export class ContextConsumer {
  @Element() el: HTMLContextConsumerElement;
  @Prop() context: { [key: string]: any } = {};
  @Prop() renderer: any = (props: any ) => {
    props;
    return null;
  };
  @Prop() listeners:  Map<HTMLContextConsumerElement, string[] | null>;

  componentWillLoad() {
    this.listeners.set(this.el, null);
  }

  componentDidUnload() {
    this.listeners.delete(this.el);
  }

  render() {
    return this.renderer({
      ...this.context
    });
  }
}

export function createProviderConsumer(defaultState: any) {
  let listeners: Map<HTMLContextConsumerElement, string[] | null> = new Map();
  let currentState = defaultState;

  function notifyConsumers() {
    listeners.forEach(updateListener)
  }

  function updateListener(fields, listener) {

    console.log(fields, listener);
    if (fields != null) {
      [...fields].forEach(fieldName => {
        listener[fieldName] = currentState[fieldName];
      });
    } else {
      listener.context = {
        ...currentState
      };
    }
    listener.forceUpdate();
  }

  function attachListener(propList: string[] = null) {
    return (el: HTMLElement) => {
      listeners.set(el as HTMLContextConsumerElement, propList);
      updateListener(propList, el);
    }
  }

  return {
    Provider: function({ state, children }: any) {
      currentState = state;
      notifyConsumers();
      return children;
    },
    Consumer: function({ children }: any) {
      return (
        <context-consumer
          listeners={listeners}
          renderer={children[0]}
          context={currentState}
        />
      );
    },
    WrapConsumer: function(childComponent: any, fieldList: string[] = []) {
      const Child = childComponent.is;

      return ({ children, ...props}: any ) => {
        return (
          <Child ref={attachListener(fieldList)} {...props}>
            { children }
          </Child>
        );
      };
    }
  }
}
