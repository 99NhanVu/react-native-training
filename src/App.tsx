import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import store from './Store';
import {Provider} from 'react-redux';

import ApplicationNavigation from './Navigators/Application';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ApplicationNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
