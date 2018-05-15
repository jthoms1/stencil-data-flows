import { Component, State, Prop, Watch } from '@stencil/core';
import { createStore } from '../../stores/index';

export type Listener = () => void;

@Component({
  tag: 'context-consumer'
})
export class ContextConsumer {
  @Prop() store: { [key: string]: any } = {};
  @Prop() renderer: (props: { [key: string]: any }) => any = (props: { [key: string]: any }) => {
    props;
    return null;
  };

  @State() data: any = {};

  unsubscribe: Listener;

  componentWillLoad() {
    // subscribe the project's active router and listen
    // for changes. Recompute the match if any updates get
    // pushed
    this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
  }

  componentDidUnload() {
    // be sure to unsubscribe to the router so that we don't
    // get any memory leaks
    this.unsubscribe();
  }

  handleChange(propName: string, data: any) {
    console.log(propName, data);
    this.data = {
      ...this.data,
      [propName]: data
    };
  }

  render() {
    return this.renderer({
      ...this.data
    });
  }
}

@Component({
  tag: 'context-provider'
})
export class ContextProvider {
  @Prop() value: { [key: string]: any } = {};
  @Prop() store: { [key: string]: any } = {};
  @State() data: any = {};

  componentWillLoad() {
    this.valueUpdated(this.value);
  }

  @Watch('value')
  valueUpdated(newValue: any) {
    this.store.setValue(newValue);
  }
}

const {Provider, Consumer} = createProviderConsumer();


function createProviderConsumer(defaultValue = {}) {
  const store = createStore(defaultValue);
  return {
    Provider,
    Consumer
  }
}
