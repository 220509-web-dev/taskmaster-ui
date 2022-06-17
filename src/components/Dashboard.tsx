import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user";

interface IDashboardProps {
    currentUser: User | undefined
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email Address', width: 130 },
    { field: 'username', headerName: 'Username', width: 130 }
];

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
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>

            {/* <table>
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
            </table> */}
            
        </>
    );

}

export default Dashboard;