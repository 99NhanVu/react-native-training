import {Button, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EditModal from '../Components/EditNoteModal';
import {createNoteValidate} from '../Validations/note';

import {
  addNoteRequest,
  fetchNoteRequest,
  focusNote,
} from '../Store/Note/actions';
import {useSelector, useDispatch} from 'react-redux';

const Note = ({navigation}: any) => {
  const currentGroup = useSelector((state: any) => state.group.currentGroup);
  const [createNote, setCreateNote] = useState(false);
  const dispatch = useDispatch();
  const notesData = useSelector((state: any) => state.note.notes);
  const [numberItems, setNumberItems] = useState(2);

  const postNote = (values: any) => {
    setCreateNote(false);
    dispatch(addNoteRequest({...values}));
  };

  async function fetchData() {
    dispatch(fetchNoteRequest(currentGroup.id));
  }

  useEffect(() => {
    fetchData();
    navigation.setOptions({title: currentGroup.name});
  }, []);

  const notes = notesData.map((note: any, index: number) => {
    if (index < numberItems)
      return (
        <TouchableOpacity
          key={note.id}
          style={{
            backgroundColor: 'gray',
            margin: 10,
          }}
          onPress={() => {
            dispatch(focusNote(note));
            navigation.navigate('Details');
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
      <ScrollView>
        <View>{notes}</View>
        {numberItems <= notesData.length ? (
          <View
            style={{
              margin: 30,
            }}>
            <Button
              title="Show More"
              onPress={() => setNumberItems(numberItems + 2)}
            />
          </View>
        ) : null}
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
      </ScrollView>
    </>
  );
};

export default Note;
