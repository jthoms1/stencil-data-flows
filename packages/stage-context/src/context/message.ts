import { createStore, connect } from './index';

export const message = createStore({
  message: 'Hello!'
});

let actions = () => ({
  setMessage: (state, newValue: string) => ({
    ...state,
    message: newValue
  }),
  clearMessage: (state) => ({
    ...state,
    message: ''
  })
});

connect(message, actions);

(window as any).messageStore = message;
