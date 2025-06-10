import React from 'react';
import PropTypes from 'prop-types';
import TextArea from './ui/TextArea';
import ButtonPrimary from './ui/ButtonPrimary';
import useInput from '../hooks/useInput';
import { asyncAddCommentActionCreator } from '../states/threadDetail/action';
import { useDispatch } from 'react-redux';

const InputComment = ({ threadId }) => {
  const [comment, handleCommentChange, setComment] = useInput('');

  const dispatch = useDispatch();

  const handleSubmitComment = (e) => {
    e.preventDefault();

    dispatch(asyncAddCommentActionCreator(threadId, comment));

    setComment('');
  };

  return (
    <form onSubmit={handleSubmitComment}>
      <TextArea
        name="comment"
        label="Tulis komentarmu di sini..."
        required
        value={comment}
        onChange={handleCommentChange}
      />
      <ButtonPrimary type ="submit" label="Kirim" />
    </form>
  );
};

export default InputComment;

InputComment.propTypes = {
  threadId : PropTypes.string.isRequired
};
