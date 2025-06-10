import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  asyncUpvoteCommentActionCreator,
  asyncDownvoteCommentActionCreator,
  asyncNeutralizevoteCommentActionCreator,
} from '../states/threadDetail/action';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from 'react-icons/fa';
import { postedAt } from '../utils';

const CommentCard = ({ threadId, comment }) => {
  const dispatch = useDispatch();

  const isCommentUpVoted = comment.currentUserVote === 1;
  const isCommentDownVoted = comment.currentUserVote === -1;

  const handleUpvoteComment = () => {
    if (comment.currentUserVote === 1) {
      dispatch(asyncNeutralizevoteCommentActionCreator(threadId, comment.id));
    } else {
      dispatch(asyncUpvoteCommentActionCreator(threadId, comment.id));
    }
  };

  const handleDownvoteComment = () => {
    if (comment.currentUserVote === -1) {
      dispatch(asyncNeutralizevoteCommentActionCreator(threadId, comment.id));
    } else {
      dispatch(asyncDownvoteCommentActionCreator(threadId, comment.id));
    }
  };

  return (
    <div className="bg-white rounded-xl px-4 py-3 mb-4 shadow border border-gray-200">
      <div className="flex gap-3 mb-2">
        <img
          src={comment.owner.avatar}
          alt={comment.owner.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex items-start flex-col">
          <span className="text-sm font-semibold text-gray-800">
            {comment.owner.name}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            {postedAt(comment.createdAt)}
          </span>
        </div>
      </div>
      <p className="text-md text-left text-gray-800">{comment.content}</p>
      <div className="flex gap-4 mt-3 text-sm text-gray-600 border-t border-gray-600/30 pt-2">
        <button
          onClick={handleUpvoteComment}
          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
        >
          {isCommentUpVoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
          <span>{comment.upVotesBy.length}</span>
        </button>
        <button
          onClick={handleDownvoteComment}
          className="flex items-center gap-1 hover:text-red-600 transition-colors"
        >
          {isCommentDownVoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
          <span>{comment.downVotesBy.length}</span>
        </button>
      </div>
    </div>
  );
};

export default CommentCard;

CommentCard.propTypes = {
  threadId: PropTypes.string.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentUserVote: PropTypes.number, // bisa 1, -1, atau undefined/null
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

