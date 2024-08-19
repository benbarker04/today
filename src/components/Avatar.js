import React from 'react'
import styles from '../styles/Avatar.module.css'

const Avatar = ({src, height=45, text}) => {
  return (
    <span>
        <img src={styles.Avatar} height={height} width={height} alt='profile avatar'/>
        {text}
    </span>
  )
}

export default Avatar