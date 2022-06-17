import {useEffect, useState} from 'react';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import * as yup from 'yup';
import React from 'react';
import EditModal from '../Components/EditNoteModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  createGroupRequest,
  deleteGroupRequest,
  fetchGroupRequest,
  focusGroup,
  updateGroupRequest,
} from '../Store/Group/actions';

const Group = ({navigation}: any) => {
  const [createGroup, setCreateGroup] = useState(false);
  const [modalEditGroup, setModalEditGroup] = useState<any>(false);
  const groupsData = useSelector((state: any) => state.group.groups);
  const dispatch = useDispatch();

  // validate form
  const createGroupValidate = yup.object().shape({
    name: yup.string().required('name is required'),
  });

  // api call
  const postGroup = async (values: any) => {
    setCreateGroup(false);
    dispatch(createGroupRequest(values));
  };

  const deleteGroup = async () => {
    setModalEditGroup(false);
    dispatch(deleteGroupRequest(modalEditGroup));
  };

  const updateGroup = async (values: any) => {
    setModalEditGroup(false);
    dispatch(
      updateGroupRequest({
        ...values,
        id: modalEditGroup.id,
      }),
    );
  };

  async function fetchData() {
    dispatch(fetchGroupRequest());
  }

  useEffect(() => {
    // navigation.setOptions({
    //   title: 'Welcome ' + store.getState().value.username.toString(),
    // });
    fetchData();
  }, [navigation]);

  const groups = groupsData.map((group: any) => {
    return (
      <TouchableOpacity
        key={group.id}
        onPress={() => {
          dispatch(focusGroup(group));
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
