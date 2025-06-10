import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  asyncDownVoteThreadActionCreator,
  asyncNeutralizeVoteThreadActionCreator,
  asyncUpVoteThreadActionCreator,
} from '../states/shared/action';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
  FaCommentAlt,
} from 'react-icons/fa';
import { postedAt } from '../utils';

const ThreadDetailCard = ({
  id,
  title,
  body,
  category,
  owner,
  createdAt,
  upVotesBy,
  downVotesBy,
  currentUserVote,
  totalComments,
}) => {
  const dispatch = useDispatch();

  const isThreadUpvoted = currentUserVote === 1;
  const isThreadDownvoted = currentUserVote === -1;

  const handleUpvoteThread = () => {
    if (isThreadUpvoted) {
      dispatch(asyncNeutralizeVoteThreadActionCreator(id));
    } else {
      dispatch(asyncUpVoteThreadActionCreator(id));
    }
  };

  const handleDownvoteThread = () => {
    if (isThreadDownvoted) {
      dispatch(asyncNeutralizeVoteThreadActionCreator(id));
    } else {
      dispatch(asyncDownVoteThreadActionCreator(id));
    }
  };

  return (
    <div className="flex flex-col bg-white border border-gray-300 rounded-md p-4 shadow-md items-start text-left">
      <div className="mb-2">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm px-2.5 py-1 rounded-full">
          #{category}
        </span>
      </div>
      <h1 className="font-bold text-md sm:text-xl md:text-2xl text-gray-900 mb-3">
        {title}
      </h1>
      <div className="flex items-center text-gray-600 text-xs sm:text-sm mb-4">
        <img
          src={owner.avatar}
          alt={owner.name}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="font-semibold mr-1">{owner.name}</span>
        <span className="text-gray-500">• {postedAt(createdAt)}</span>
      </div>

      <div
        className="text-md max-w-none text-gray-800 mb-6 text-left"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      <div className="flex items-center gap-4 border-t border-gray-600/30 pt-3 text-gray-600 text-sm mt-2 w-full">
        <button
          onClick={handleUpvoteThread}
          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
        >
          {isThreadUpvoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
          <span>{upVotesBy.length}</span>
        </button>
        <button
          onClick={handleDownvoteThread}
          className="flex items-center gap-1 hover:text-red-600 transition-colors"
        >
          {isThreadDownvoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
          <span>{downVotesBy.length}</span>
        </button>

        {totalComments !== undefined && (
          <div className="flex items-center gap-1 text-gray-600">
            <FaCommentAlt />
            <span>{totalComments}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreadDetailCard;

ThreadDetailCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentUserVote: PropTypes.number,
  totalComments: PropTypes.number,
};
