import { StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Routes from './src/routes';
import store from './src/store';

export default function App() {
  return (
      <Provider store={store}>
        <StatusBar 
            barStyle={'default'}
        />
        <Routes />
      </Provider>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
