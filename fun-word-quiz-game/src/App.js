import axios from 'axios'
import {useEffect, useState} from 'react'

const App = () => {
    const [chosenLevel, setChosenLevel] = useState(null)
    const [wordsToPickFrom, setWordsToPickFrom] = useState(null)
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [alreadyClicked, setAlreadyClicked] = useState([])
    const [score, setScore] = useState(0)

    const getRandomQuizWords = () => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/results',
            params: {level: chosenLevel, area: 'sat'},
        }

        axios.request(options).then((response) => {
            setWordsToPickFrom(response.data)
        }).catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        if (chosenLevel) {
            getRandomQuizWords()
        }
    }, [chosenLevel])

    const checkAnswer = (possibility, possibilityIndex, correctAnswer) => {
        if (possibilityIndex == correctAnswer) {
            setCorrectAnswers([...correctAnswers, possibility])
            setScore((score) => score + 1)
        } else {
            setScore((score) => score - 1)
        }
        setAlreadyClicked([...alreadyClicked, possibility])
    }

    return (
        <div className="app">

            {!chosenLevel && <div className="levelSelector">
                <h1>Fun Word Quiz App</h1>
                <p>Select a level to begin, mortal.</p>
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
            </div>}

            {chosenLevel && wordsToPickFrom && <div className="questionContainer">
                <h2>Clash your brain with level: {chosenLevel}</h2>
                <h3>Your score is: {score}</h3>
                <div className="questionWrapper">
                    {wordsToPickFrom.quizlist.map((question, _questionIndex) => (
                        <div key={_questionIndex} className="questionCard">
                            {question.quiz.map((option, _index) => (
                                <p key={_index}>{option}</p>
                            ))}

                            <div className="questionButtons">
                                {question.option.map((possibility, _possibilityIndex) => (
                                    <div key={_possibilityIndex} className="questionButton">
                                        <button
                                            disabled={alreadyClicked.includes(possibility)}
                                            onClick={() => checkAnswer(possibility, _possibilityIndex + 1, question.correct)}
                                        >{possibility}</button>
                                        {correctAnswers.includes(possibility) && <p>correct!</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={() => setChosenLevel(null)}>Go Back</button>
            </div>}
        </div>
    )
}

export default App;