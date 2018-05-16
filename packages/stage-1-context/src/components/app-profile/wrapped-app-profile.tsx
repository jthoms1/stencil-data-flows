import { Component, Prop } from '@stencil/core';
import Data from '../../context/message';

@Component({
  tag: 'wrapped-app-profile',
})
export class WrappedAppProfile {

  @Prop() message: string;
  @Prop() increment: (event: MouseEvent) => void;

  render() {
    return (
      <div class='app-profile'>
        <button onClick={this.increment}>Increment Num</button>
        <p>{this.message}</p>
      </div>
    );
  }
}

export const WrappedAppProfileCmp = Data.wrapConsumer(WrappedAppProfile, [
  'message',
  'increment'
]);
