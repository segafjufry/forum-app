// voteType: 'up' | 'down' | 'neutral'
function getVoteType({ upVotesBy, downVotesBy }, userId) {
  if (upVotesBy.includes(userId)) return 'up';
  if (downVotesBy.includes(userId)) return 'down';
  return 'neutral';
}

// Mengembalikan daftar upVotesBy/downVotesBy baru setelah user
// mengubah vote-nya menjadi voteType.
function computeVotes({ upVotesBy, downVotesBy }, userId, voteType) {
  const up = upVotesBy.filter((id) => id !== userId);
  const down = downVotesBy.filter((id) => id !== userId);

  if (voteType === 'up') up.push(userId);
  if (voteType === 'down') down.push(userId);

  return { upVotesBy: up, downVotesBy: down };
}

export { getVoteType, computeVotes };
