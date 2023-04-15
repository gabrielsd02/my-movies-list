import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';

import Routes from './src/routes';
import store from './src/store';

export default function App() {
  return (
      <Provider store={store}>
        <StatusBar 
            barStyle={'default'}
            translucent
        />
        <Toast />
        <Routes />
      </Provider>    
  );
}
