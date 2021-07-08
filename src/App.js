import {useState, useEffect} from 'react'
import './App.css';
import { auth } from './services/firebase'
import {Helmet} from 'react-helmet'
import Header from './components/Header/Header'
import Weather from './components/Weather/Weather'
import Tickets from './components/Tickets/Tickets'
import StadiumInfo from './components/Stadiuminfo/StadiumInfo'
import Login from './components/Login/Login'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

function App() {
  const [state, setState] = useState ({
    user: null,
    stadiums: [{ stadium: '', location: ''}],
    newStadium: {
      stadium: '',
      location: ''
    }
  })

  async function getAppData() {
    const BASE_URL = 'http://localhost:3001/api/stadiums'
    const stadiums = await fetch(BASE_URL).then(res => res.json())
    console.log(stadiums)
    setState((prevState) => ({
      ...prevState,
      stadiums,
    }))
  }

  useEffect(() => {
    getAppData()
    auth.onAuthStateChanged(user => {
      if (user) {
        setState(prevState => ({
          ...prevState,
          user,
        }))
      } else {
        setState(prevState => ({
          ...prevState,
          // state: <div>Please Login First</div>,
          user: null,
        }))
      }
    })
  }, [])

  async function addStadium(e) {
    if(!state.user) return

    e.preventDefault()

    const BASE_URL = 'http://localhost:3001/api/stadiums'
    const stadium = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify(state.newStadium)
    }).then(res => res.json())

    setState((prevState) => ({
      ...prevState,
      stadiums: [...prevState.stadiums, stadium],
      newStadium: {
        stadium: '',
        location: '',
      },
    }))
  }

  function handleChange(e) {
    setState((prevState) => ({
      ...prevState,
      newStadium: {
        ...prevState.newStadium,
        [e.target.name]: e.target.value
      }
    }))
  }

  return (
  <>  
  <Helmet>
    <title>MLB Stadium Tracker</title>
  </Helmet>
  <Router>
    <Header user={state.user}/>
          <div>
            <ul  class='stadiuminfo'>
              <li>
                <ul>
                  <Link to='/stadiuminfo'>Stadium Info</Link><br />
                </ul>
              </li>
              <li>
                <Route exact path='/stadiuminfo'>
                  <StadiumInfo />
                </Route>
              </li>
            </ul>
          </div>
        </Router>
      <main>
      {
            !state.user &&
            <>
              <h1 class='loggedout'>Welcome to your MLB stadium tracker!</h1>
              <h4 class='loggedout'>To begin tracking your cross country baseball journey, please login! </h4>
            </>
          }
          {
            state.user &&
          
        <section>
          <h2 id='stadiumheader'>My Stadiums</h2>
          {state.stadiums.map((s) => (
            <article key={s.stadium}>
              <Router>
              <div>
                  <a href="/stadiuminfo">{s.stadium}</a>
              </div>
              <div>
                  <a href="/stadiuminfo">{s.location}</a>
              </div><br />
              </Router>
            </article>
          ))}
          {
          <>
          <hr />
          <form onSubmit={addStadium}>
            <label>
              <span id='stadiumspan'>Stadium</span>
              <input name='stadium' value={state.newStadium.stadium} onChange={handleChange}/>
            </label>
              <label>
                <span id='locationspan'>Location</span>
                <input name="location" value={state.newStadium.location} onChange={handleChange}></input>
              </label>
              <button>Add Stadium</button>
          </form>
          </>
          }
        </section>
}
        <Weather />
        <Tickets />
      </main>
  </>    
  );
}


export default App;
