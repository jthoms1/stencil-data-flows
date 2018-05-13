import { Component, Prop } from '@stencil/core';
import { message } from '../../stores/message';

@Component({
  tag: 'render-prop-test'
})
export class RenderPropTest {
  @Prop() messageData: any = null;

  render() {
    const stores = {
      'messageData': message
    };
    return (
      <render-prop stores={stores} renderer={({ messageData }) => (
        <span>{messageData ? messageData.message : null}</span>
      )} />
    );
  }
}
