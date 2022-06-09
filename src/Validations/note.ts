import * as yup from 'yup';

const createNoteValidate = yup.object().shape({
  name: yup.string().required('name is required'),
  description: yup.string().required('description is required'),
  group: yup.string().required('group is required'),
});

export {createNoteValidate};
