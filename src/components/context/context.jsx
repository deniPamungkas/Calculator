import React,{createContext, useState} from 'react'

export const ThemeContext = createContext();
export const SetThemeContext = createContext();
const Context = ({children}) => {
    const [night, setNight] = useState(false);
    const setNightMode = () =>{
      return setNight(!night)
    }
  return (
    <ThemeContext.Provider value={night}>
      <SetThemeContext.Provider value={setNightMode}>
        {children}
      </SetThemeContext.Provider>
    </ThemeContext.Provider>
  )
}

export default Context