import {useState, useEffect} from 'react'
import './App.css';
import { auth } from './services/firebase'

function App() {
  const [stadium, setStadium] = useState ({
    user: null,
    stadiums: [{ stadium: 'Yankee Stadium', location: 'Bronx, New York'}],
    newStadium: {
      stadium: '',
      location: ''
    }
  })

  async function getAppData() {
    const BASE_URL = 'http://localhost:3001/api/stadiums'
    const stadiums = await fetch(BASE_URL).then(res => res.json())
    console.log(stadiums)
    setStadium((prevState) => ({
      ...prevState,
      stadiums,
    }))
  }

  useEffect(() => {
    getAppData()
    auth.onAuthStateChanged(user => {
      if (user) {
        setStadium(prevState => ({
          ...prevState,
          user,
        }))
      } else {
        setStadium(prevState => ({
          ...prevState,
          user: null,
        }))
      }
    })
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
