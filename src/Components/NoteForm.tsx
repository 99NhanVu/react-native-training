import {Button, Text, TextInput, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import React from 'react';
import {useSelector} from 'react-redux';

const NoteForm = (props: any) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isValid,
    onClose,
    onDelete,
  } = props;

  const dropdownData = useSelector((state: any) =>
    state.group.groups.map((group: any) => group.name),
  );

  return (
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
          data={dropdownData}
          onSelect={selectedItem => {
            values.group = selectedItem;
          }}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem;
          }}
          rowTextForSelection={option => {
            return option;
          }}
          defaultValue={values.group}
        />
        {errors.group && touched.group && <Text>{errors.group}</Text>}
      </View>
      <View>
        <Button title="Cancel" onPress={onClose} />
        <Button title="Save" onPress={handleSubmit} />
        <Button title="Delete" onPress={onDelete} />
      </View>
    </>
  );
};

export default NoteForm;
