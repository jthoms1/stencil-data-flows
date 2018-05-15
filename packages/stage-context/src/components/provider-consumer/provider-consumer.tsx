import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'context-consumer'
})
export class ContextConsumer {
  @Prop() context: { [key: string]: any } = {};
  @Prop() renderer: any = (props: any ) => {
    props;
    return null;
  };

  render() {
    return this.renderer({
      ...this.context
    });
  }
}


export function createProviderConsumer(defaultState: any) {
  let listeners: HTMLContextConsumerElement[] = [];
  let currentState = defaultState;

  function notifyConsumers() {
    listeners.forEach(listener => {
      listener.context = {
        ...currentState
      };
      listener.forceUpdate();
    });
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
          ref={(el: HTMLContextConsumerElement) => listeners.push(el)}
          renderer={children[0]}
          context={currentState}
        />
      );
    }
  }
}
