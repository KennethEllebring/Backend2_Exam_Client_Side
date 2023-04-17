import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/SearchUser.scss';

function SearchUser() {

  const [searchTerm, setSearchTerm] = useState('')
  const [userList, setUserList] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const navigate = useNavigate()
  const [showAutocomplete, setShowAutocomplete] = useState(false)

  useEffect(() => {

    const fetchUsers = async () => {
      const response = await fetch('http://localhost:5050/users/all', {
        credentials: 'include'
      })
      if(!response.ok){
        throw new Error('Error fetching users')
      }
      const users = await response.json()
      setUserList(users.users)
    }
    fetchUsers()

  }, [])

  useEffect(() => {
    if (searchTerm === '') {
      return setSearchResult([])
    }
    const result = userList.filter((user) => {
      return user.includes(searchTerm.toLowerCase())
    })
    setSearchResult(result)
  }, [searchTerm, userList])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const renderedUsers = searchResult.slice(0, 10).map((user) => {
    return (
      <li key={user} className="userItem" onClick={(() => navigate(`../profile/${user}`))}>
        <p>{user}</p>
      </li>
    )
  })



  return (
    <div className="searchArea">
      <h2>Search for user</h2>
      <input
        type="text"
        className="searchInput"
        placeholder="Search for users.."
        onChange={handleChange}
        onFocus={() => setShowAutocomplete(true)}
        onBlur={() => setTimeout(() => setShowAutocomplete(false), 250)}
      />
      <ul className="searchList">
        {showAutocomplete ? renderedUsers : null}
      </ul>
    </div>
  )
}

export default SearchUser