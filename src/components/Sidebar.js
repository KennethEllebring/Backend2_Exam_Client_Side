import SearchUser from "./SearchUser";
import { Link } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import { useEffect } from "react";
import { useState } from "react";
import '../styles/Sidebar.scss';


function Sidebar () {

    const {setLoggedIn, setUser, user} = useAuth();
    const [followers, setFollowers] = useState(0);


    const handleLogout = async () => {
        try {
        const res = await fetch('http://localhost:5050/auth/logout', {
            credentials: 'include',
        });
        if (res.ok) {
            setLoggedIn(false);
            setUser(null);
        }
        } catch (error) {
        console.error(error);
        }
    };

    const getFollowers = async () => {
        const response = await fetch(`http://localhost:5050/users/single/${user.username}`, {
            method: 'GET',
            credentials: 'include'
        });

        const currentUser = await response.json();
        const followerList = currentUser.followers;
        setFollowers(followerList);
    };

    useEffect(() => {
        getFollowers()
    }, [])

    return (
        

            <div className="sidebar">
                <SearchUser />

                <div className="nav-links">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to={`/profile/${user.username}`}>Profile</Link>
                </div>
                
                <div className="user-info">
                    <Link to={`/profile/${user.username}`}>
                        <h3>@{user.username}</h3>
                    </Link>

                    <p>
                        {followers.length} {followers.length === 1 ? 'follower' : 'followers'}
                    </p>

                    <button onClick={handleLogout}>Log Out</button>
                </div>
            </div>
    )
}

export default Sidebar;