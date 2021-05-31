import React, { useState, createContext, useContext, useEffect } from 'react'
import Header from "./components/Header"
import Signup from "./pages/signup"
import Login from "./pages/login"
import Home from "./pages/home"
import Dashboard from "./pages/dashboard"
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';

export const GlobalCtx = createContext(null)

function App() {

  const [gState, setGState] = useState({
    url: "http://localhost:4000", 
    token: null
  })

  //SEEING IF ALREADY LOGGED IN
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    console.log(token)
    if (token) {
      setGState({...gState, token: token.token})
    }
  }, [])

  return (
    <GlobalCtx.Provider value ={{gState, setGState}}>
      <div className="App">
        <Link to="/"><h1>ReactNotes</h1></Link>
        <Header />
        <main>
          <Switch>            {/* If token comes back as true, then user sees the dashboard, else, they shall not pass! And they will stay at home  */}
            <Route exact path="/" render={(rp => gState.token ? <Dashboard /> : <Home />)}/>
            <Route path="/signup" render={(rp) => <Signup {...rp}/>} />
            <Route path="/login" render={(rp) => <Login {...rp}/>}/>
            <Route path="/dashboard" render={(rp => <h1>dashboard</h1>)}/>
          </Switch>
        </main>
      </div>
    </GlobalCtx.Provider>
  );
}

export default App;
