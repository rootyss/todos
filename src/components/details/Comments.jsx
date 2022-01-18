import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import useApi from '../../hooks/useApi.jsx';
import { getUser } from '../../store/userSlice.js';
import { getModalInfo } from '../../store/modalSlice.js';
import Spinner from '../spinner/Spinner.jsx';

const Comments = () => {
  const userUid = useSelector(getUser).uid;
  const taskId = useSelector(getModalInfo).currentTaskId;
  const dateCommentAdded = `${new Date()}`;
  const api = useApi();

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      text: Yup.string().trim().required().max(60),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { text } = values;
      try {
        api.addCommentToFirebase({
          userUid, taskId, text, dateCommentAdded,
        });
        resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div>
      <form className="form-comments" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="text">
            <input
              className="text-comment"
              id="text"
              name="text"
              type="text"
              value={formik.values.text}
              onChange={formik.handleChange}
            />
          </label>
        </div>
        <div>
          <button
            className="btn-send"
            type="submit"
            variant="primary"
            autoComplete="off"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? <Spinner /> : <i className="arrow right" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
