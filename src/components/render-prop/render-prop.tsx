import { Component, State, Prop } from '@stencil/core';

export type Listener = () => void;
export type keyobj = { [key: string]: any };

@Component({
  tag: 'with-subscription'
})
export class HigherOrder {
  @Prop() stores: { [key: string]: any } = {};
  @Prop() renderer: (props: keyobj) => any = (props: keyobj) => {
    props;
    return null;
  };

  @State() data: any = {};

  unsubscribeList: Listener[] = [];

  componentWillLoad = function() {
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

  handleChange = (propName: string, data: any) => {
    this.data = {
      [propName]: data,
      ...this.data
    };
  }

  render() {
    return this.renderer(this.data);
  }
}
