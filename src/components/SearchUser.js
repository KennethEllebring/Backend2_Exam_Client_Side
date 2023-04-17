import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FollowButton from './FollowButton';
import '../styles/SearchUser.scss';

function SearchUser() {

  const [searchTerm, setSearchTerm] = useState('')
  const [userList, setUserList] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const navigate = useNavigate()

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
      <li key={user} className="userItem">
        <p onClick={(() => navigate(`../profile/${user}`))}>{user}</p>
        <FollowButton user={user} className="followBtn" />
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
      />
      <ul className="searchList">
        {renderedUsers}
      </ul>
    </div>
  )
}

export default SearchUser