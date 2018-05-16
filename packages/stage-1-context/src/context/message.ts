import { createProviderConsumer } from '../components/provider-consumer/provider-consumer';

export interface State {
  message: string,
  increment?: () => void
}

export default createProviderConsumer<State>({
  message: 'Hello!'
});
