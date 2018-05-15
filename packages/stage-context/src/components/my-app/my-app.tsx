import { Component, State } from '@stencil/core';

import Data from '../../context/message';

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

  @State() message: string = 'Hello!';

  count: number = 0;

  increment = () => {
    this.count = this.count + 1;
    this.message = `${this.message} ${this.count}`;
    console.log(this.message);
  }

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>
        <button onClick={this.increment}></button>

        <Data.Provider state={{ message: this.message }} >
          <main>
            <stencil-router>
              <stencil-route url='/' component='app-home' exact={true} />
              <stencil-route url='/profile/:name' component='app-profile' />
            </stencil-router>
          </main>
        </Data.Provider>
      </div>
    );
  }
}
