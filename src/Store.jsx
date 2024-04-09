import React, { useState ,createContext, Children} from 'react'
export const UserContext = createContext()
const Store = ({ children }) => {
    const [ username,setUsername]=useState('')
  return (
    <UserContext.Provider value={{ username,setUsername}}>
{children}
    </UserContext.Provider>
  )
}

export default Store