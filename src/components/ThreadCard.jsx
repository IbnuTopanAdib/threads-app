import React from 'react';
import PropTypes from 'prop-types';
import { getSafePreview, postedAt } from '../utils';
import {
  asyncDownVoteThreadActionCreator,
  asyncNeutralizeVoteThreadActionCreator,
  asyncUpVoteThreadActionCreator,
} from '../states/shared/action';
import { useDispatch } from 'react-redux';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
  FaCommentAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ThreadCard = ({
  id,
  title,
  body,
  category,
  createdAt,
  ownerAvatar,
  ownerName,
  upVotesBy,
  currentUserVote,
  downVotesBy,
  totalComment,
}) => {
  const dispatch = useDispatch();

  const isThreadUpvoted = currentUserVote === 1;
  const isThreadDownvoted = currentUserVote === -1;

  const totalUpVotes = upVotesBy.length;
  const totalDownVotes = downVotesBy.length;

  const handleUpVoteThread = () => {
    if (isThreadUpvoted) {
      dispatch(asyncNeutralizeVoteThreadActionCreator(id));
    } else {
      dispatch(asyncUpVoteThreadActionCreator(id));
    }
  };

  const handleDownVoteThread = () => {
    if (isThreadDownvoted) {
      dispatch(asyncNeutralizeVoteThreadActionCreator(id));
    } else {
      dispatch(asyncDownVoteThreadActionCreator(id));
    }
  };

  return (
    <div className="flex flex-col bg-white border border-gray-300 rounded-md p-3 sm:p-4 md:p-5 mb-4 text-sm sm:text-base transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="mb-1 ml-auto">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          #{category}
        </span>
      </div>
      <div className="flex items-start mb-4">
        <img
          src={ownerAvatar}
          alt={ownerName}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="flex flex-col items-start">
          <div className="font-semibold text-gray-800">{ownerName}</div>
          <div className="text-xs text-gray-500">{postedAt(createdAt)}</div>
        </div>
      </div>
      <div className="flex flex-col items-start mb-3">
        <Link to={`/threads/${id}`} className="hover:underline">
          <h2 className="font-medium text-gray-900 text-base sm:text-lg">
            {title}
          </h2>
        </Link>
        <Link to={`/threads/${id}`}>
          <p className="text-gray-800 mt-1 text-sm sm:text-base">
            {getSafePreview(body)}
          </p>
        </Link>
      </div>
      <div className="flex justify-between items-center border-t border-gray-600/30 pt-3 text-gray-600 text-xs sm:text-sm mt-2">
        <div className="flex gap-3 sm:gap-4">
          <button
            onClick={handleUpVoteThread}
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            {isThreadUpvoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
            <span>{totalUpVotes}</span>
          </button>
          <button
            onClick={handleDownVoteThread}
            className="flex items-center gap-1 hover:text-red-600 transition-colors"
          >
            {isThreadDownvoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
            <span>{totalDownVotes}</span>
          </button>
          <div className="flex items-center gap-1 text-gray-600">
            <FaCommentAlt />
            <span>{totalComment}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;

ThreadCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerAvatar: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentUserVote: PropTypes.number,
  totalComment: PropTypes.number.isRequired,
};
