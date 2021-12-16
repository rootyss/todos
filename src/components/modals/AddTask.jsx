import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const ModalAddTask = ({ close }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      headerTask: '',
      description: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      headerTask: Yup.string().trim().required(),
      description: Yup.string().trim(),
    }),
    onSubmit: async (values) => {
      try {
        close();
      } catch (err) {
        console.log(err);
      }
    },
  });

  const textInput = useRef(null);
  useEffect(() => {
    textInput.current.select();
  }, []);

  return (
    <div />
  );
};

export default ModalAddTask;
