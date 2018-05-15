import { Component, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { message } from '../../stores/message';

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
    const stores = {
      'messageData': message
    };

    if (this.match && this.match.params.name) {
      return (
        <connect-store stores={stores} renderer={({ messageData }) => (

          <div class='app-profile'>
            {console.log('renderer with ', messageData)}
            <p>
              {messageData ? messageData.message : null} My name is {this.match.params.name}.
              My name was passed in through a route param!
            </p>
            <some-component message={messageData.message} />
          </div>

        )} />
      );
    }
  }
}
