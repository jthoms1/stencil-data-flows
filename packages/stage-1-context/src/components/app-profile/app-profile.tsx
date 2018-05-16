import { Component } from '@stencil/core';
import Data from '../../context/message';

@Component({
  tag: 'app-profile',
})
export class AppProfile {
  render() {
    return (
      <Data.Consumer>
        {({ message, increment }) => (
          <div class='app-profile'>
            <button onClick={increment}>Increment Num</button>
            <p>{message}</p>
          </div>
        )}
      </Data.Consumer>
    );
  }
}
