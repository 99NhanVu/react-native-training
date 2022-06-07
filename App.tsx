/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  StatusBar,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';
import {createSlice, configureStore} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: {id: 0, username: ''},
  },
  reducers: {
    loginAction: (state, {payload}) => {
      state.value.id = payload.id;
      state.value.username = payload.username;
    },
  },
});

const {loginAction} = authSlice.actions;

const store = configureStore({
  reducer: authSlice.reducer,
});

// env variables
const REACT_APP_API_URL = 'http://192.168.1.98:8000/api/';

// types
interface Note {
  id: number;
  description: string;
  name: string;
  groupId: number;
}

interface Group {
  id: number;
  name: string;
}

interface CreateNotePayload {
  description: string;
  name: string;
  group: string;
}

interface CreateGroupPayload {
  name?: string;
}

interface LoginPayload {
  id?: number;
  username: string;
  password: string;
}

function DashboardScreen({navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalEditNote, setModalEditNote] = useState(0);
  const [modalEditGroup, setModalEditGroup] = useState(0);
  const [modalCreateNote, setModalCreateNote] = useState(0);
  const [notesData, setNotesData] = useState<Note[]>([]);
  const [groupsData, setGroupsData] = useState<Group[]>([]);

  // validate form
  const createGroupValidate = yup.object().shape({
    name: yup.string().required('name is required'),
  });

  const createNoteValidate = yup.object().shape({
    name: yup.string().required('name is required'),
    description: yup.string().required('description is required'),
    group: yup.string().required('group is required'),
  });

  // api call

  const createNote = async (values: CreateNotePayload) => {
    await axios.post(`${REACT_APP_API_URL}notes/`, values);
    setModalCreateNote(0);
    fetchData();
  };

  const updateNote = async (values: CreateNotePayload) => {
    await axios.put(`${REACT_APP_API_URL}notes/${modalEditNote}/`, {
      ...values,
      id: modalEditNote,
    });
    setModalEditNote(0);
    fetchData();
  };

  const deleteNote = async () => {
    await axios.delete(`${REACT_APP_API_URL}note/delete/${modalEditNote}`);
    setModalEditNote(0);
    fetchData();
  };

  const createGroup = async (values: CreateGroupPayload) => {
    await axios.post(`${REACT_APP_API_URL}groups/`, values);
    setModalVisible(!isModalVisible);
    fetchData();
  };

  const deleteGroup = async () => {
    await axios.delete(`${REACT_APP_API_URL}group/delete/${modalEditGroup}`);
    setModalEditGroup(0);
    fetchData();
  };

  const updateGroup = async (values: CreateGroupPayload) => {
    await axios.put(`${REACT_APP_API_URL}groups/${modalEditGroup}/`, {
      ...values,
      id: modalEditGroup,
    });
    setModalEditGroup(0);
    fetchData();
  };

  // helper
  const currentNote = () => {
    const filteredNote = notesData.find(note => note.id === modalEditNote);
    return filteredNote ?? {name: '', description: '', group: ''};
  };

  async function fetchData() {
    setNotesData(
      (await axios.get((REACT_APP_API_URL + 'notes') as string)).data,
    );
    setGroupsData(
      (await axios.get((REACT_APP_API_URL + 'groups') as string)).data,
    );
  }

  useEffect(() => {
    navigation.setOptions({
      title: 'Welcome ' + store.getState().value.username.toString(),
    });
    fetchData();
  }, [navigation]);

  const groups = groupsData.map(group => {
    return (
      <TouchableOpacity
        key={group.id}
        onPress={() => {
          setModalEditGroup(group.id);
        }}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              padding: 10,
              fontWeight: 'bold',
              backgroundColor: 'red',
            }}>
            {group.name}
          </Text>

          {notesData
            .filter(note => note.groupId === group.id)
            .map(note => {
              return (
                <TouchableOpacity
                  key={note.id}
                  style={{
                    backgroundColor: 'gray',
                    margin: 10,
                  }}
                  onPress={() => {
                    setModalEditNote(note.id);
                  }}>
                  <View>
                    <Text>{note.description}</Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                      {note.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
        <View
          style={{
            margin: 20,
          }}>
          <Button
            title="Add note"
            onPress={() => setModalCreateNote(group.id)}
          />
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <>
      <Button
        title="Create Group"
        onPress={() => setModalVisible(!isModalVisible)}
      />
      <ScrollView>
        <>
          {groups}
          {/* Create group note modal */}
          <Modal isVisible={isModalVisible}>
            <Formik
              validationSchema={createGroupValidate}
              initialValues={{name: ''}}
              onSubmit={values => createGroup(values)}>
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
                  <Text>Group Name</Text>
                  <TextInput
                    style={{
                      width: '80%',
                      borderWidth: 2,
                    }}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  {errors.name && touched.name && <Text>{errors.name}</Text>}

                  <View>
                    <Button
                      title="Cancel"
                      onPress={() => setModalVisible(!isModalVisible)}
                    />
                    <Button
                      title="Save"
                      disabled={!isValid}
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </Modal>
          {/* Edit group note modal */}
          <Modal isVisible={modalEditNote > 0}>
            <Formik
              validationSchema={createNoteValidate}
              initialValues={{
                name: currentNote().name,
                description: currentNote().description,
                group: '',
              }}
              onSubmit={values => updateNote(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      height: 300,
                    }}>
                    <Text>Note Name</Text>
                    <TextInput
                      style={{
                        width: '80%',
                        borderWidth: 2,
                      }}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                    {errors.name && touched.name && <Text>{errors.name}</Text>}
                    <Text>Note Description</Text>
                    <TextInput
                      style={{
                        width: '80%',
                        borderWidth: 2,
                      }}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                    />
                    {errors.description && touched.description && (
                      <Text>{errors.description}</Text>
                    )}
                    {/* Select group to create in */}
                    <Text>Group</Text>
                    <SelectDropdown
                      data={groupsData.map(group => group.name)}
                      onSelect={selectedItem => {
                        values.group = selectedItem;
                      }}
                      buttonTextAfterSelection={selectedItem => {
                        return selectedItem;
                      }}
                      rowTextForSelection={option => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return option;
                      }}
                      defaultValue={
                        groupsData.find(
                          group =>
                            group.id ===
                            notesData.find(note => note.id === modalEditNote)
                              ?.groupId,
                        )?.name ?? 'Select an option'
                      }
                    />
                    {errors.group && touched.group && (
                      <Text>{errors.group}</Text>
                    )}
                  </View>
                  <View>
                    <Button
                      title="Cancel"
                      onPress={() => setModalEditNote(0)}
                    />
                    <Button
                      title="Save"
                      disabled={!isValid}
                      onPress={handleSubmit}
                    />
                    <Button title="Delete" onPress={deleteNote} />
                  </View>
                </>
              )}
            </Formik>
          </Modal>
          {/* Edit group modal */}
          <Modal isVisible={modalEditGroup > 0}>
            <Formik
              validationSchema={createGroupValidate}
              initialValues={{
                name:
                  modalEditGroup > 0
                    ? groupsData.find(group => group.id === modalEditGroup)
                        ?.name
                    : '',
              }}
              onSubmit={values => updateGroup(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      height: 300,
                    }}>
                    <Text>Edit Note</Text>
                    <TextInput
                      style={{
                        width: '80%',
                        borderWidth: 2,
                      }}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                    {errors.name && touched.name && <Text>{errors.name}</Text>}
                  </View>
                  <View>
                    <Button
                      title="Cancel"
                      onPress={() => setModalEditGroup(0)}
                    />
                    <Button
                      title="Save"
                      disabled={!isValid}
                      onPress={handleSubmit}
                    />
                    <Button title="Delete" onPress={deleteGroup} />
                  </View>
                </>
              )}
            </Formik>
          </Modal>
          {/* Create note modal */}
          <Modal isVisible={modalCreateNote > 0}>
            <Formik
              validationSchema={createNoteValidate}
              initialValues={{name: '', description: '', group: ''}}
              onSubmit={values => createNote(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      height: 300,
                    }}>
                    <Text>Note Name</Text>
                    <TextInput
                      style={{
                        width: '80%',
                        borderWidth: 2,
                      }}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                    {errors.name && touched.name && <Text>{errors.name}</Text>}
                    <Text>Note Description</Text>
                    <TextInput
                      style={{
                        width: '80%',
                        borderWidth: 2,
                      }}
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                    />
                    {errors.description && touched.description && (
                      <Text>{errors.description}</Text>
                    )}
                    {/* Select group to create in */}
                    <Text>Group</Text>
                    <SelectDropdown
                      data={groupsData.map(group => group.name)}
                      onSelect={selectedItem => {
                        values.group = selectedItem;
                      }}
                      buttonTextAfterSelection={selectedItem => {
                        return selectedItem;
                      }}
                      rowTextForSelection={option => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return option;
                      }}
                      defaultValue={
                        groupsData.find(
                          group =>
                            group.id ===
                            notesData.find(note => note.id === modalEditNote)
                              ?.groupId,
                        )?.name ?? 'Select an option'
                      }
                    />
                    {errors.group && touched.group && (
                      <Text>{errors.group}</Text>
                    )}
                  </View>
                  <View>
                    <Button
                      title="Cancel"
                      onPress={() => {
                        setModalCreateNote(0);
                      }}
                    />
                    <Button
                      disabled={!isValid}
                      title="Create"
                      onPress={handleSubmit}
                    />
                  </View>
                </>
              )}
            </Formik>
          </Modal>
        </>
      </ScrollView>
    </>
  );
}

function LoginScreen({navigation}) {
  const loginValidate = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(3).required('Password is required'),
  });

  const login = async (values: LoginPayload) => {
    const {data} = await axios.post(`${REACT_APP_API_URL}login`, values);
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
}

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}
      />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
