import React from 'react';
import PropTypes from 'prop-types';
import ThreadCard from './ThreadCard';

const ThreadList = ({ threads, users }) => {
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  return (
    <div>
      {threads.map((thread) => {
        const owner = userMap[thread.ownerId];

        return (
          <ThreadCard
            key={thread.id}
            id={thread.id}
            title={thread.title}
            body={thread.body}
            category={thread.category}
            createdAt={new Date(thread.createdAt).toLocaleString()}
            ownerAvatar={owner?.avatar || ''}
            ownerName={owner?.name || 'Unknown'}
            upVotesBy={thread.upVotesBy}
            downVotesBy={thread.downVotesBy}
            totalComment={thread.totalComments}
            currentUserVote={thread.currentUserVote}
          />
        );
      })}
    </div>
  );
};

export default ThreadList;

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number,
      currentUserVote: PropTypes.number,
    })
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
};
