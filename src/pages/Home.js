import React, { useContext } from 'react'
import SignUpForm from '../components/SignUpForm'
import { CurrentUserContext } from '../App'

function Home() {
    const currentUser = useContext(CurrentUserContext)
    const loggedIn = <><h1>You are logged in!</h1></>
    const loggedOut = <><SignUpForm/></>

  return (
    <div>{currentUser ? loggedIn : loggedOut}</div>
  )
}

export default Home