import React from 'react';
import CommentCard from '../components/CommentCard';
import ThreadDetailCard from '../components/ThreadDetailCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { asyncSetDetailThreadActionCreator } from '../states/threadDetail/action';
import InputComment from '../components/InputComment';

const DetailThreadPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const  threadDetail  = useSelector((states) => states.threadDetail);

  useEffect(() => {
    dispatch(asyncSetDetailThreadActionCreator(id));
  }, [dispatch, id]);

  if (!threadDetail) return <p className="text-center">Loading thread...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <ThreadDetailCard {...threadDetail} />
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg text-left font-semibold mb-4">
          Berikan Komentar
        </h2>
        <InputComment threadId={id} />
        <div className="mt-6 space-y-4">
          {threadDetail.comments.map((comment) => (
            <CommentCard key={comment.id} threadId={id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailThreadPage;
