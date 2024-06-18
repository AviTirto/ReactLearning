import { useState, useEffect, useRef } from 'react'
import FlashcardList from './FlashcardList';
import './app.css'

// For future self, incase forget: es7 react/redux --> auto boiler plate
function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  const categoryEl = useRef()
  const amountEl = useRef()

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

  useEffect(() => {
    const fetchCategories = async () => {
      try{
        const res = await fetch('https://opentdb.com/api_category.php');
        const data = await res.json()
        setCategories(data.trivia_categories)
      }catch(error){}
    }  

    fetchCategories()
  }, [])

  function handleSubmit(e){
    e.preventDefault()

    const fetchData = async () => {
      try{
        const res = await fetch('https://opentdb.com/api.php', {
          params: {
            amount: amountEl.value.current,
            category: categoryEl.value.current
          }
        });
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
      }catch(error){
        console.log("HERE")
      }
    }
    
    fetchData();
  }

  return (
    <>
      <form className = 'header' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='category'>Category</label>
          <select id='category' ref = {categoryEl}>
            { categories.map(
              category => {
                return <option value={category.id} key={category.id}>{category.name}</option>
              }
            ) }
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>Number of Questions</label>
          <input type='number' id='amount' min={1} step={1} defaultValue={10} ref={amountEl}></input>
        </div>
        <div className='form-group'>
          <button className='btn'>Generate</button>
        </div>
      </form>

      <div className='container'>
        <FlashcardList flashcards = {flashcards}/>
      </div>
    </>
  );
}

export default App;
