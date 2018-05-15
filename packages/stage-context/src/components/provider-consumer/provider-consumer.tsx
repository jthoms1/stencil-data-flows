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
  @Prop() listeners: Set<HTMLContextConsumerElement>;

  componentWillLoad() {
    this.listeners.add(this.el);
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
  let listeners = new Set<HTMLContextConsumerElement>();
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
          listeners={listeners}
          renderer={children[0]}
          context={currentState}
        />
      );
    }
  }
}
