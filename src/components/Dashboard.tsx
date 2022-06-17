import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user";

interface IDashboardProps {
    currentUser: User | undefined
}

function Dashboard(props: IDashboardProps) {

    const [users, setUsers] = useState([] as User[]);

    useEffect(() => {
        console.log('The Dashboard component was (re)rendered!');
        fetch('http://localhost:8080/quizzard/users')
            .then(resp => resp.json())
            .then(data => setUsers(data as unknown as User[]));

        return () => {
            console.log('The Dashboard component was unrendered!');
        }
    }, []);

    return (
        !props.currentUser ? <Navigate to="/login"/> :
        <>
            <h1>Welcome, {props.currentUser.firstName}!</h1>
            <Typography variant="subtitle1">Taskmaster Users</Typography>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email address</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, idx) => {
                return (
                    <tr key={idx}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                    </tr>
                );
            })}
                </tbody>
            </table>
            
        </>
    );

}

export default Dashboard;