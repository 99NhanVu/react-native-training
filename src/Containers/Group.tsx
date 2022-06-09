import axios from 'axios';
import {useEffect, useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import * as yup from 'yup';
import {store} from '../Store';
import React from 'react';
import EditModal from '../Components/EditNoteModal';

const Group = ({navigation}) => {
  const [createGroup, setCreateGroup] = useState(false);
  const [modalEditNote, setModalEditNote] = useState(0);
  const [modalEditGroup, setModalEditGroup] = useState<any>(false);
  const [modalCreateNote, setModalCreateNote] = useState(0);
  const [notesData, setNotesData] = useState<any[]>([]);
  const [groupsData, setGroupsData] = useState<any[]>([]);

  // validate form
  const createGroupValidate = yup.object().shape({
    name: yup.string().required('name is required'),
  });

  // api call
  const postGroup = async (values: any) => {
    setCreateGroup(false);
    await axios.post(`${process.env.REACT_APP_API_URL}/groups/`, values);
    fetchData();
  };

  const deleteGroup = async () => {
    setModalEditGroup(false);
    navigation.goBack();
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/group/delete/${modalEditGroup.id}`,
    );
  };

  const updateGroup = async (values: any) => {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/groups/${modalEditGroup}/`,
      {
        ...values,
        id: modalEditGroup.id,
      },
    );
    setModalEditGroup(false);
    fetchData();
  };

  async function fetchData() {
    setGroupsData(
      (await axios.get(`${process.env.REACT_APP_API_URL}/groups` as string))
        .data,
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
          navigation.navigate('Note', {
            groupId: group.id,
            groupName: group.name,
          });
        }}
        onLongPress={() => {
          setModalEditGroup(group);
        }}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              backgroundColor: 'red',
              margin: 5,
            }}>
            {group.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <>
      <Button title="Create Group" onPress={() => setCreateGroup(true)} />
      {groups}
      {/* create group modal */}
      <EditModal
        group={createGroup}
        initialValues={{name: ''}}
        onClose={() => {
          setCreateGroup(false);
        }}
        onSubmit={postGroup}
      />
      {/* edit group modal */}
      <EditModal
        group={modalEditGroup}
        initialValues={{name: modalEditGroup?.name ?? ''}}
        onClose={() => {
          setModalEditGroup(false);
        }}
        onSubmit={updateGroup}
        onDelete={deleteGroup}
      />
    </>
  );
};

export default Group;
