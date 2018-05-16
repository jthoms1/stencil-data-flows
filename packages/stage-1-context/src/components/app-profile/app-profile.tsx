import { Component, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import Data from '../../context/message';

@Component({
  tag: 'app-profile',
  styles: `
    .app-profile {
      padding: 10px;
    }
  `
})
export class AppProfile {

  @Prop() match: MatchResults;

  render() {
    if (this.match && this.match.params.name) {
      return (
        <Data.Consumer>
          {({ message, increment }) => (

          <div class='app-profile'>
            <button onClick={increment}>Increment Num</button>
            {console.log('renderer function with ', message)}
            <p>
              {message} My name is {this.match.params.name}.
              My name was passed in through a route param!
            </p>
          </div>
        )}
        </Data.Consumer>
      );
    }
  }
}

@Component({
  tag: 'wrapped-app-profile',
  styles: `
    .app-profile {
      padding: 10px;
    }
  `
})
export class WrappedAppProfile {

  @Prop() message: string;
  @Prop() increment: (event: MouseEvent) => void;

  render() {
    console.log(this.message);
    return (
      <div class='app-profile'>
        <button onClick={this.increment}>Increment Num</button>
        <p>
          {this.message}
        </p>
      </div>
    );
  }
}

export const WrappedAppProfileCmp = Data.WrapConsumer(WrappedAppProfile, [
  'message',
  'increment'
]);
