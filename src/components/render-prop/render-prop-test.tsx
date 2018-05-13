import { Component, Prop } from '@stencil/core';
import { router } from '../../stores/router';

@Component({
  tag: 'hoc-test'
})
export class HocTest {
  @Prop() routerData: any = null;

  render() {
    const stores = {
      'routerData': router
    };
    return (
      <with-subscription stores={stores} renderer={({ routerData }) => (
        <span>{routerData.message}</span>
      )} />
    );
  }
}
