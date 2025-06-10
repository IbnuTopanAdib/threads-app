import React from 'react';
import InputThread from '../components/InputThread';

const CreateThreadPage = () => {
  return (
    <div className="max-w-xl mx-auto mt-6">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">
          Buat Diskusi Baru
        </h2>
        <InputThread />
      </div>
    </div>
  );
};

export default CreateThreadPage;
