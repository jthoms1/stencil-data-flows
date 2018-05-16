import { Component } from '@stencil/core';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import { Provider } from '../stencil-redux';

const store = createStore(rootReducer);

@Component({
  tag: 'todo-app',
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
export class TodoApp {

  render() {
    return (
      <Provider store={store}>
      </Provider>
    );
  }
}
