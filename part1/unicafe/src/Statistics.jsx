const StatisticLine = ({ label, value }) => <tr>
  <td>{label}</td>
  <td>{value}</td>
</tr>;

const Statistics = ({ good, neutral, bad }) => {
  const calculateAll = () => good + neutral + bad;
  const calculateAverage = () => (good + bad * -1) / (good + bad + neutral);
  const calculatePercentPositive = () => `${good / (good + neutral + bad)} %`;

  if (calculateAll() == 0) {
    return <p>No feedback given.</p>;
  }
  return <>
    <table>
      <tbody>
        <StatisticLine label="good" value={good} />
        <StatisticLine label="neutral" value={neutral} />
        <StatisticLine label="bad" value={bad} />
        <StatisticLine label="all" value={calculateAll()} />
        <StatisticLine label="average" value={calculateAverage()} />
        <StatisticLine label="positive" value={calculatePercentPositive()} />
      </tbody>
    </table>
  </>;
}

export default Statistics;
