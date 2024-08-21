import React from 'react'
import SignUpForm from '../components/SignUpForm'
import { useCurrentUser } from '../context/CurrentUserContext'

function Home() {
    const currentUser = useCurrentUser()
    const loggedInPage = <><h1>You are logged in!</h1></>
    const loggedOutPage = <><SignUpForm/></>

  return (
    <div>{currentUser ? loggedInPage : loggedOutPage}</div>
  )
}

export default Home