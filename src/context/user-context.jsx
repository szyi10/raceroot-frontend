import { useState, useEffect, createContext } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"

const UserContext = createContext({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
})

export const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const [cookies, removeCookie] = useCookies([])

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.jwt) {
        console.log("no jwt cookie found")
      }

      const res = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_DATABASE_URL}/api/v1/users/me`,
        withCredentials: true,
      })

      setUser(res.data.data)
      setIsLoggedIn(true)
    }
    verifyCookie()
  }, [cookies, setUser, removeCookie])

  const loginHandler = (data) => {
    setIsLoggedIn(true)
    setUser(data)
  }

  const logoutHandler = async () => {
    await axios({
      method: "GET",
      url: `${import.meta.env.VITE_DATABASE_URL}/api/v1/users/logout`,
      withCredentials: true,
    })

    setIsLoggedIn(false)
    setUser(null)
    location.reload(true)
  }

  const contextValue = {
    isLoggedIn,
    user,
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

export default UserContext
