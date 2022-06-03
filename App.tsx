/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Modal from 'react-native-modal';
import {useState} from 'react';
import SelectDropdown from 'react-native-select-dropdown';

function DashboardScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalEditNote, setModalEditNote] = useState(0);
  const [modalEditGroup, setModalEditGroup] = useState(0);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const groupData = [
    {
      id: 1,
      name: 'Group 1',
    },
    {
      id: 2,
      name: 'Group 2',
    },
  ];

  const notesData = [
    {
      id: 1,
      name: 'John',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. id 1',
      groupId: 1,
    },
    {
      id: 2,
      name: 'Jane',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. id 2',
      groupId: 1,
    },
    {
      id: 3,
      name: 'Jack',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. id 3',
      groupId: 2,
    },
  ];

  const groups = groupData.map(group => {
    return (
      <TouchableOpacity
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
                  style={{
                    backgroundColor: '#1e90ff',
                    height: '30%',
                    width: '40%',
                    margin: 10,
                  }}
                  onPress={() => {
                    setModalEditNote(note.id);
                  }}>
                  <View>
                    <Text>{note.description}</Text>
                    <Text>{note.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
        <View>
          <Button title="Add note" onPress={() => {}} />
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <>
      <Button title="Create Group" onPress={toggleModal} />
      {groups}
      {/* Create group note modal */}
      <Modal isVisible={isModalVisible}>
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
          />
          <View>
            <Button title="Cancel" onPress={toggleModal} />
            <Button title="Save" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
      {/* Edit group note modal */}
      <Modal isVisible={modalEditNote > 0}>
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
              modalEditNote > 0 ? notesData[modalEditNote - 1].description : ''
            }
          />
          <Text>Move to</Text>
          {/* Select group to move to */}
          <SelectDropdown
            data={groupData.map(group => group.name)}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem;
            }}
            rowTextForSelection={item => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            defaultValue={
              groupData.find(
                group =>
                  group.id ===
                  notesData.find(note => note.id === modalEditNote)?.groupId,
              )?.name ?? 'Select an option'
            }
          />
        </View>
        <View>
          <Button title="Cancel" onPress={() => setModalEditNote(0)} />
          <Button title="Save" onPress={() => setModalEditNote(0)} />
          <Button title="Delete" onPress={() => setModalEditNote(0)} />
        </View>
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
              modalEditGroup > 0 ? groupData[modalEditGroup - 1].name : ''
            }
          />
        </View>
        <View>
          <Button title="Cancel" onPress={() => setModalEditGroup(0)} />
          <Button title="Save" onPress={() => setModalEditGroup(0)} />
          <Button title="Delete" onPress={() => setModalEditGroup(0)} />
        </View>
      </Modal>
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
