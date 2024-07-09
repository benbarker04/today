import React from 'react'
import SignUpForm from '../components/SignUpForm'
import { useCurrentUser } from '../context/CurrentUserContext'

function Home() {
    const currentUser = useCurrentUser()
    const loggedIn = <><h1>You are logged in!</h1></>
    const loggedOut = <><SignUpForm/></>

  return (
    <div>{currentUser ? loggedIn : loggedOut}</div>
  )
}

export default Home