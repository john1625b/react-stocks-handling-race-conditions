import './App.css';
import {useEffect, useState, useCallback, memo} from "react";

const User = ({email, first_name, last_name, avatar}) => {
    return (
        <div>{email}</div>
    )
}

function App() {
    const [users, setUsers] = useState([])
    const fetchData = async () => {
        let res = await fetchData('https://reqres.in/api/users?page=2')
        res = await res.json()
        setUsers(res.data)
    }
    return (
        <div className='App'>
            <h1>Users</h1>
            {
                users ? users.map(({id, email, first_name, last_name, avatar}) => (
                    <User key={id} email={email}/>
                    ))
                    : <div>Loading...</div>
            }
        </div>
    )
}

export default App;
