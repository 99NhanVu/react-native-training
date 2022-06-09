import {Button, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EditModal from '../Components/EditNoteModal';
import {createNoteValidate} from '../Validations/note';
import {useIsFocused} from '@react-navigation/native';

const Note = ({route, navigation}) => {
  const {groupId, groupName} = route.params;
  const [notesData, setNotesData] = useState<any[]>([]);
  const [createNote, setCreateNote] = useState(false);
  const isFocused = useIsFocused();

  const postNote = async (values: any) => {
    setCreateNote(false);
    await axios.post(`${process.env.REACT_APP_API_URL}/notes/`, values);
    fetchData();
  };

  async function fetchData() {
    setNotesData(
      (
        await axios.get(
          `${process.env.REACT_APP_API_URL}/group/${groupId}` as string,
        )
      ).data,
    );
  }

  useEffect(() => {
    fetchData();
    navigation.setOptions({title: groupName, groupId});
  }, [isFocused]);

  const notes = notesData.map(note => {
    return (
      <TouchableOpacity
        key={note.id}
        style={{
          backgroundColor: 'gray',
          margin: 10,
        }}
        onPress={() => {
          navigation.navigate('Details', {note, groupName, groupId});
        }}>
        <View>
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
  });

  return (
    <>
      <View>{notes}</View>
      <View
        style={{
          margin: 20,
        }}>
        <Button
          title="Add note"
          onPress={() => {
            setCreateNote(true);
          }}
        />
      </View>
      {/* Create note modal */}
      <EditModal
        note={createNote}
        validationSchema={createNoteValidate}
        onClose={() => {
          setCreateNote(false);
        }}
        onSubmit={postNote}
        initialValues={{
          name: '',
          description: '',
          group: '',
        }}
      />
    </>
  );
};

export default Note;
