import { Component, State, Prop } from '@stencil/core';

export type Listener = () => void;

@Component({
  tag: 'connect-store'
})
export class ConnectStore {
  @Prop() stores: { [key: string]: any } = {};
  @Prop() renderer: (props: { [key: string]: any }) => any = (props: { [key: string]: any }) => {
    props;
    return null;
  };

  @State() data: any = {};

  unsubscribeList: Listener[] = [];

  componentWillLoad() {
    // subscribe the project's active router and listen
    // for changes. Recompute the match if any updates get
    // pushed
    this.unsubscribeList = Object.keys(this.stores).map((propName: string) => {
      const store = this.stores[propName];
      return store.subscribe(this.handleChange.bind(this, propName));
    });
  }

  componentDidUnload() {
    // be sure to unsubscribe to the router so that we don't
    // get any memory leaks
    this.unsubscribeList.map(unsubscribe => unsubscribe());
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
