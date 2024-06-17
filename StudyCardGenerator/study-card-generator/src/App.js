import { useState } from 'react'
import FlashcardList from './FlashcardList';
import './app.css'

// For future self, incase forget: es7 react/redux --> auto boiler plate
function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE)
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
