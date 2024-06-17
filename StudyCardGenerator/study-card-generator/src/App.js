import { useState, useEffect } from 'react'
import FlashcardList from './FlashcardList';
import './app.css'
import axios from 'axios';

// For future self, incase forget: es7 react/redux --> auto boiler plate
function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios
          .get("https://opentdb.com/api.php?amount=10")
          .then(res => {
            setFlashcards(
              res.data.results.map((questionItem, index) => {
                const answer = questionItem.correct_answer
                const options = [...questionItem.incorrect_answers, answer]
                return {
                  id: `${index}-${Date.now()}`,
                  question: questionItem.question,
                  answer: answer,
                  options: options.sort(() => Math.random() - .5)
                }
              }) 
            )
          }
          )
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Call the async function defined above
  
    // Note: No dependencies in the dependency array [], meaning this effect runs once after the initial render
  }, []);

  return (
    <FlashcardList flashcards = {flashcards}/>
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
