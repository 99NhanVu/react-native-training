import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Containers/Login';
import Group from '../Containers/Group';
import Note from '../Containers/Note';
import Details from '../Containers/Details';

const Stack = createNativeStackNavigator();

const ApplicationNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Group">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Group" component={Group} />
      <Stack.Screen name="Note" component={Note} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default ApplicationNavigation;
