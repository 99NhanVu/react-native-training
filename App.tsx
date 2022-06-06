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

// env variables
const REACT_APP_API_URL = 'http://192.168.1.98:8000/api/';

function DashboardScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalEditNote, setModalEditNote] = useState(0);
  const [modalEditGroup, setModalEditGroup] = useState(0);
  const [modalCreateNote, setModalCreateNote] = useState(0);
  const [notesData, setNotesData] = useState<any[]>([]);
  const [groupsData, setGroupsData] = useState<any[]>([]);

  // validate form
  const createGroupValidate = yup.object().shape({
    groupName: yup.string().required('groupName is required'),
  });

  const createNoteValidate = yup.object().shape({
    name: yup.string().required('name is required'),
    description: yup.string().required('description is required'),
    group: yup.string().required('group is required'),
  });

  // api call
  const createGroup = async (values: any) => {
    await axios.post(`${REACT_APP_API_URL}groups/`, values);
    setModalVisible(!isModalVisible);
    fetchData();
  };

  const createNote = async (values: any) => {
    await axios.post(`${REACT_APP_API_URL}notes/`, values);
    setModalCreateNote(0);
    fetchData();
  };

  const updateNote = async (values: any) => {
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
    fetchData();
  }, []);

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
              initialValues={{groupName: ''}}
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
                    onChangeText={handleChange('groupName')}
                    onBlur={handleBlur('groupName')}
                    value={values.groupName}
                  />
                  {errors.groupName && touched.groupName && (
                    <Text>{errors.groupName}</Text>
                  )}

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
                defaultValue={
                  modalEditGroup > 0 ? groupsData[modalEditGroup - 1].name : ''
                }
              />
            </View>
            <View>
              <Button title="Cancel" onPress={() => setModalEditGroup(0)} />
              <Button title="Save" onPress={() => setModalEditGroup(0)} />
              <Button title="Delete" onPress={() => setModalEditGroup(0)} />
            </View>
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
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
