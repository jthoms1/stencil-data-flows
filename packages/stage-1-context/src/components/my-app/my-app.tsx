import { Component, State, Prop } from '@stencil/core';
import { RouterSwitch } from '@stencil/router';
import Data from '../../context/message';
import { WrappedAppProfileCmp } from '../app-profile/wrapped-app-profile';

@Component({
  tag: 'my-app',
  styles: `
    header {
      background: #5851ff;
      color: white;
      height: 56px;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    }

    h1 {
      font-size: 1.4rem;
      font-weight: 500;
      color: #fff;
      padding: 0 12px;
    }
  `
})
export class MyApp {

  @Prop() intro: string = 'Hello!';
  @State() message: string = '';

  count: number = 0;

  componentWillLoad() {
    this.increment();
  }

  increment = () => {
    this.count = this.count + 1;
    this.message = `${this.intro} ${this.count}`;
  }

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>
        <main>
          <Data.Provider state={{ message: this.message, increment: this.increment }}>
            <stencil-router>
              <WrappedAppProfileCmp/>
              <RouterSwitch>
                <stencil-route url='/' component='app-home' exact={true}></stencil-route>
                <stencil-route url='/profile' component='app-profile'></stencil-route>
              </RouterSwitch>
            </stencil-router>
          </Data.Provider>
        </main>
      </div>
    );
  }
}
