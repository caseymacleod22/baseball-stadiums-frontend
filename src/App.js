import {useState, useEffect} from 'react'
import './App.css';
import { auth } from './services/firebase'
import Header from './components/Header/Header'

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

  async function addStadium(e) {
    if(!stadium.user) return

    e.preventDefault()

    const BASE_URL = 'http://localhost:3001/api/stadiums'
    const stadium = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify(stadium.newSkill)
    }).then(res => res.jso())

    setStadium((prevState) => ({
      ...prevState,
      stadiums: [...prevState.skills, stadium],
      newStadium: {
        stadium: '',
        location: ''
      },
    }))
  }

  function handleChange(e) {
    setStadium((prevState) => ({
      ...prevState,
      newStadium: {
        ...prevState.newStadium,
        [e.target.name]: e.target.value
      }
    }))
  }

  return (
  <>  
    <Header user={stadium.user}/>
      <main>
        <section>
          {stadium.stadiums.map((s) => (
            <article key={s.stadium}>
              <div>{s.stadium}</div> <div>{s.location}</div>
            </article>
          ))}
        </section>
      </main>
  </>    
  );
}

export default App;
