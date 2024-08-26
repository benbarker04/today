import React from 'react'
import { useCurrentUser } from '../context/CurrentUserContext'


function Home() {
    const currentUser = useCurrentUser()
    const loggedInPage = <><h1>You are logged in</h1></>
    const loggedOutPage = <><h1>You are logged out</h1></>

  return (
    <div>{currentUser ? loggedInPage : loggedOutPage}</div>
  )
}

export default Home