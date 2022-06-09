import React, {useEffect} from 'react';
import Modal from 'react-native-modal';
import {Formik} from 'formik';
import NoteForm from './NoteForm';
import GroupForm from './GroupForm';

const EditModal = (props: any) => {
  const {
    group,
    note,
    validationSchema,
    initialValues,
    onSubmit,
    onClose,
    onDelete,
  } = props;
  const [isNoteModal, setIsNoteModal] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    if (note) {
      setIsNoteModal(true);
      setIsVisible(true);
    } else if (group) {
      setIsNoteModal(false);
      setIsVisible(true);
    } else if (!note && !group) {
      setIsVisible(false);
    }
  }, [note, group]);

  return (
    <Modal isVisible={isVisible}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            {isNoteModal ? (
              <NoteForm
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
                values={values}
                errors={errors}
                touched={touched}
                isValid={isValid}
                onClose={onClose}
                onDelete={onDelete}
              />
            ) : (
              <GroupForm
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
                values={values}
                errors={errors}
                touched={touched}
                isValid={isValid}
                onClose={onClose}
                onDelete={onDelete}
              />
            )}
          </>
        )}
      </Formik>
    </Modal>
  );
};

export default EditModal;
