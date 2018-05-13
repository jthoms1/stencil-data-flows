import { createStore } from './index';

export const router = createStore({
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

(<any>window).router = router;
