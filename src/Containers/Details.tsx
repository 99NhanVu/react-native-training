import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import EditModal from '../Components/EditNoteModal';
import {createNoteValidate} from '../Validations/note';
import {deleteNoteRequest, updateNoteRequest} from '../Store/Note/actions';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

const Details = ({route, navigation}: any) => {
  const {groupName, groupId} = route.params;
  // const [note, setNote] = useState(route.params.note);
  const note = useSelector((state: any) => state.note.currentNote);
  const [editNote, setEditNote] = useState<any>(false);
  const dispatch = useDispatch();

  const deleteNote = async () => {
    dispatch(deleteNoteRequest(editNote));
    navigation.navigate('Note', {
      groupId,
      groupName,
    });
  };

  const updateNote = async (values: any) => {
    setEditNote(false);
    dispatch(updateNoteRequest({...values, id: editNote.id}));
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
