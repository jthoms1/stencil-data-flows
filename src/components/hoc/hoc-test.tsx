import { Component, Prop } from '@stencil/core';
import { withSubscription } from './hoc';
import { message } from '../../stores/message';

@Component({
  tag: 'hoc-test'
})
export class HocTest {
  @Prop() messageData: any = null;

  render() {
    return (
      <span>{this.messageData ? this.messageData.message : null}</span>
    );
  }
}

export const HocTestImp = withSubscription(HocTest, {
  'messageData': message
});
