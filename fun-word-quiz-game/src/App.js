import axios from 'axios'
import {useEffect, useState} from 'react'

const App = () => {
  const [chosenLevel, setChosenLevel] = useState(null)
  const [wordsToPickFrom, setWordsToPickFrom] = useState(null)

  const getRandomQuizWords = () => {
    const options = {
      method: 'GET',
      url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
      params: {level: chosenLevel, area: 'sat'},
      headers: {
        'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
      }
    };

    axios.request(options).then((response) => {
      console.log(response.data)
      setWordsToPickFrom(response.data)
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <div className="app">
      <select name="levels"
              id="levels"
              value={chosenLevel}
              onChange={(e) => setChosenLevel(e.target.value)}>
        <option value={null}>Level options</option>
        <option value="1">Level 1</option>
        <option value="2">Level 2</option>
        <option value="3">Level 3</option>
        <option value="4">Level 4</option>
        <option value="5">Level 5</option>
        <option value="6">Level 6</option>
        <option value="7">Level 7</option>
        <option value="8">Level 8</option>
        <option value="9">Level 9</option>
        <option value="10">Level 10</option>
      </select>
    </div>
  )
}

export default App;
