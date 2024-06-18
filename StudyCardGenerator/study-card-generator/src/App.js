import { useState, useEffect } from 'react'
import FlashcardList from './FlashcardList';
import './app.css'

// For future self, incase forget: es7 react/redux --> auto boiler plate
function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE)

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await fetch('https://opentdb.com/api.php?amount=10');
        const data = await res.json()

        setFlashcards(
          data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer)
            const options = [
              ...questionItem.incorrect_answers.map(o => decodeString(o)),
              answer
            ]
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - .5)
            }
          })
        )
      }catch(error){}
    }
    
    fetchData();
  
  }, [])

  function decodeString(str){
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  return (
    <div className='container'>
      <FlashcardList flashcards = {flashcards}/>
    </div>
  );
}

const SAMPLE = [
  {
    id: 1,
    question: 'What is the capital of Indonesia?',
    answer: 'Jakarta',
    options: [
      'Washington D.C.',
      'Paris',
      'Moscow',
      'Beijing',
      'Jakarta'
    ]
  },
  {
    id: 2,
    question: 'What is the capital of China?',
    answer: 'Beijing',
    options: [
      'Singapore',
      'Berlin',
      'Tokyo',
      'Beijing',
      'Melbourne'
    ]
  }
]

export default App;
