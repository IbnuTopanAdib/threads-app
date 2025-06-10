import React from 'react';
import useInput from '../hooks/useInput';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { asyncAddThreadActionCreator } from '../states/threads/action';
import InputText from './ui/InputText';
import TextArea from './ui/TextArea';
import ButtonPrimary from './ui/ButtonPrimary';

const InputThread = () => {
  const [title, handleTitleChange, setTitle] = useInput('');
  const [category, handleCategoryChange, setCategory] = useInput('');
  const [body, handleBodyChange, setBody] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const threadData = {
      title,
      category,
      body,
    };

    dispatch(asyncAddThreadActionCreator(threadData));

    setTitle('');
    setCategory('');
    setBody('');

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputText
        type="text"
        label="Judul"
        value={title}
        onChange={handleTitleChange}        required
      />
      <InputText
        type="text"
        label="Kategori"
        value={category}
        onChange={handleCategoryChange}        required
      />
      <TextArea
        label="Tuliskan isi diskusi..."
        value={body}
        onChange={handleBodyChange}
        required
      />
      <ButtonPrimary label ="Buat Diskusi" type ="submit"/>
    </form>
  );
};

export default InputThread;
