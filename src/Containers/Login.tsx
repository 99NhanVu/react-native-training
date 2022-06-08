import * as yup from 'yup';
import axios from 'axios';
import {Button, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {loginAction, store} from '../Store';
import React from 'react';

const LoginContainers = ({navigation}) => {
  const loginValidate = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(3).required('Password is required'),
  });

  const login = async (values: any) => {
    const {data} = await axios.post(
      `${process.env.REACT_APP_API_URL}/login`,
      values,
    );
    if (data.success) {
      store.dispatch(loginAction(data));
    }
  };

  store.subscribe(() => {
    if (store.getState().value.id > 0) {
      navigation.navigate('Dashboard');
    }
  });

  return (
    <View>
      <Formik
        validationSchema={loginValidate}
        initialValues={{username: '', password: ''}}
        onSubmit={values => login(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              height: 300,
            }}>
            <Text>Username</Text>
            <TextInput
              style={{
                width: '80%',
                borderWidth: 2,
              }}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {errors.username && touched.username && (
              <Text>{errors.username}</Text>
            )}
            <Text>Password</Text>
            <TextInput
              style={{
                width: '80%',
                borderWidth: 2,
              }}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text>{errors.password}</Text>
            )}
            <View>
              <Button
                disabled={!isValid}
                title="Login"
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginContainers;
