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
          {({ message }) => (

          <div class='app-profile'>
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
