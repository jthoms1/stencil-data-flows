import { createStore } from './index';

export const message = createStore({
  name: 'messageData',
  defaultState: {
    message: 'Hello!'
  },
  setMessageAction(newValue: string) {
    this.setState({
      ...this.getState(),
      message: newValue
    });
  },
  clearMessageAction() {
    this.setMessageAction('');
  }
});

(window as any).messageStore = message;
