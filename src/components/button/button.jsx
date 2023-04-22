import React, { useContext } from 'react'
import './button.scss'
import { ThemeContext } from '../context/context'


const Button = ({className,children, action}) => {
  const context = useContext(ThemeContext)
  return (
    <button className={`btn ${className} ${context? 'nightMode' : ''}`} onClick={action}>
        {children}
    </button>
  )
}

export default Button