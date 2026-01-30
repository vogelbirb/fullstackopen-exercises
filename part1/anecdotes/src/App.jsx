import { useState } from 'react';
import Button from './Button';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };
  const handleNext = () => setSelected(Math.floor(Math.random() * anecdotes.length));

  const getMostVoted = () => votes.reduce((maxIndex, count, index) => {
    if (count > votes[maxIndex]) {
      return index;
    } else {
      return maxIndex;
    }
  }, 0);
  const indexMostVoted = getMostVoted();

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        {votes[selected]} votes
      </p>
      <Button onClick={handleVote} text="Vote" />
      <Button onClick={handleNext} text="Next Anecdote" />
      <h1>Anecdote With Most Votes</h1>
      <p>{[anecdotes[indexMostVoted]]}</p>
      <p>{votes[indexMostVoted]} votes</p>
    </div>
  );
}

export default App;
