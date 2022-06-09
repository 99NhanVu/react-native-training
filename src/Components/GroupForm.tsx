import {Button, Text, TextInput, View} from 'react-native';
import React from 'react';

const GroupForm = (props: any) => {
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
  return (
    <>
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
      </View>
      <View>
        <Button title="Cancel" onPress={onClose} />
        <Button title="Save" onPress={handleSubmit} />
        {onDelete ? <Button title="Delete" onPress={onDelete} /> : <></>}
      </View>
    </>
  );
};

export default GroupForm;
