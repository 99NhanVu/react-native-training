import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import ApplicationNavigation from './Navigators/Application';
const App = () => {
  return (
    <NavigationContainer>
      <ApplicationNavigation />
    </NavigationContainer>
  );
};

export default App;
