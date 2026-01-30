import { useState } from 'react';
import Button from './Button';
import Statistics from './Statistics';
import Header from './Header';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };


  return (
    <>
      <Header text="Give Feedback" />
      <Button text="Good" onClick={handleGood} />
      <Button text="Neutral" onClick={handleNeutral} />
      <Button text="Bad" onClick={handleBad} />
      <Header text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
}

export default App;
