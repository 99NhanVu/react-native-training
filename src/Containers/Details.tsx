import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import EditModal from '../Components/EditNoteModal';
import {createNoteValidate} from '../Validations/note';
import axios from 'axios';

const Details = ({route, navigation}) => {
  const {groupName, groupId} = route.params;
  const [note, setNote] = useState(route.params.note);
  const [editNote, setEditNote] = useState<any>(false);

  const deleteNote = async () => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/note/delete/${editNote.id}`,
    );
    navigation.navigate('Note', {
      groupId,
      groupName,
    });
  };

  const updateNote = async (values: any) => {
    setEditNote(false);
    const {data} = await axios.put(
      `${process.env.REACT_APP_API_URL}/notes/${editNote.id}/`,
      {
        ...values,
        id: editNote.id,
      },
    );
    setNote(data);
  };
  return (
    <>
      <TouchableOpacity
        key={note.id ?? undefined}
        style={{
          backgroundColor: 'gray',
          margin: 10,
        }}
        onPress={() => {
          setEditNote(note);
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
      <EditModal
        note={editNote}
        validationSchema={createNoteValidate}
        onClose={() => {
          setEditNote(false);
        }}
        onSubmit={updateNote}
        onDelete={deleteNote}
        initialValues={{
          name: note.name,
          description: note.description,
          group: groupName,
        }}
      />
    </>
  );
};

export default Details;
