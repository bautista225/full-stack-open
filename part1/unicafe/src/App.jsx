import { useState } from 'react'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

const Statistics = ({feedbackValues}) => {
  const [good, neutral, bad] = feedbackValues
  const all = good + neutral + bad
  if (all == 0)
    return <div>No feedback given</div>
  
  const averageScore = (good * 1 + neutral * 0 + bad * -1)/all
  const positiveValues = good/all * 100

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={(averageScore).toFixed(1)} />
        <StatisticLine text='positive' value={(positiveValues).toFixed(1) + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  // Guarda los clics de cada botón en su propio estado.
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title='give feedback'/>
      <Button text='good' handleClick={() => {setGood(good + 1)}}/>
      <Button text='neutral' handleClick={() => {setNeutral(neutral + 1)}}/>
      <Button text='bad' handleClick={() => {setBad(bad + 1)}}/>
      <Header title='statistics'/>
      <Statistics feedbackValues={[good, neutral, bad]}/>
    </div>
  )
}

export default App