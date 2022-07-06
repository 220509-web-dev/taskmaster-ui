import { css } from "@emotion/css";
import { Button, FormControl, Input, InputLabel, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { User } from "../models/user";
import ErrorMessage from "./ErrorMessage";

interface ILoginProps {
    currentUser: User | undefined, // union types (this or that)
    setCurrentUser: (nextUser: User) => void
}

type LoginForm = {
    username: string;
    password: string;
}

function Login(props: ILoginProps) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginForm>({
        username: '',
        password: ''
    });
    
    const [errorMsg, setErrorMsg] = useState<string>();
    
    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    let login = async (e: SyntheticEvent) => {
        
        const { username, password } = formData;

        if (!username || !password) {
            setErrorMsg('You must provide a username and a password!');
            return;
        } else {
            setErrorMsg('');
        }
        
        try {
            let resp = await fetch(`${process.env.REACT_APP_API_URL}/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });

            if (resp.status !== 200) {
                setErrorMsg('Could not validate provided credentials!');
            } else {
                props.setCurrentUser(await resp.json());
            }
        } catch (err) {
            setErrorMsg('There was an error communicating with the API');
        }

    }

    return (

        props.currentUser ? <Navigate to="/dashboard"/> : 

        <div 
            id="login-component"
            className={css`
                justify-content: center;
                margin-left: 32rem;
                margin-top: 6rem;
                padding: 1rem;
                width: 40%;`}>

            <Typography align="center" variant="h4">Log into your account</Typography>
        
            <div
                id="login-form-fields"
                className={css`padding: .5rem;`}>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                    />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                </FormControl>
            </div>

            <div
                id="options-container"
                className={css`margin: .25rem;`}>

                <Button
                    id="nav-to-register-button"
                    className={css`float: left;`}
                    onClick={() => navigate('/register')}
                    variant="contained"
                    color="secondary"
                    size="medium">Register</Button>

                <Button
                    id="login-button"
                    className={css`float: right;`}
                    onClick={login}
                    variant="contained"
                    color="primary"
                    size="medium">Login</Button>
            
            </div>

            <div
                id="error-container"
                className={css`
                    margin-top: 4rem;`}>
                { errorMsg ? <ErrorMessage errorMessage={errorMsg}/> : <></> }
            </div>
            

        </div>
    );

}

export default Login;