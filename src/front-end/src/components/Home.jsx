import React from 'react'
import QueueEntry from './QueueEntry'

const Home = () => {
  // const [categories, setCategories] = useState([])
  // const [entries, setEntries] = useState([])

  // useEffect(() => {
  //     fetch('https://journal-api-deployment.onrender.com/categories')
  //     .then(res => res.json())
  //     .then(data => setCategories(data))
  // }, [])

  // useEffect(() => {s
  //     fetch('https://journal-api-deployment.onrender.com/entries')
  //     .then(res => res.json())
  //     .then(data => setEntries(data))
  // }, [])
  return (
    <>
      <div>Home</div>
      <QueueEntry />
    </>
  )
}

export default Home