import {useState} from "react";
import {Button, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {Navigate, useNavigate} from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import { User } from "../models/user";
import { css } from '@emotion/css'

interface IRegisterProps {
    currentUser: User | undefined
}

function Register(props: IRegisterProps) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    let isFormValid = () => {
        for (let field in formData) {
            // @ts-ignore
            if (!formData[field]) {
                return false;
            }
        }
        return true;
    }

    let register = async () => {

        if (!isFormValid()) {
            setErrorMessage('You need to complete the registration form!');
            return;
        }

        try {
            await fetch('http://taskmasterapi-env.eba-6rxd6zer.us-east-1.elasticbeanstalk.com/taskmaster/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            navigate('/confirmation');
        } catch (e: any) {
            setErrorMessage(e.message);
        }
    }

    return (

        props.currentUser ? <Navigate to="/dashboard"/> :

            <div 
                id="register-component" 
                className={css`
                    justify-content: center;
                    margin-left: 32rem;
                    margin-top: 2rem;
                    padding: 1rem;
                    width: 25%;
                `}
            >
                <Typography align="center" variant="h4">Register for Quizzard!</Typography>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Enter your first name"
                    />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter your last name"
                    />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input
                        onChange={handleChange}
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter your email address"
                    />
                </FormControl>


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

                <br/><br/>

                <Button
                    id="register-button"
                    onClick={register}
                    variant="contained"
                    color="primary"
                    size="medium">Register</Button>

                <br/><br/>

                { errorMessage ? <ErrorMessage errorMessage={errorMessage}/> : <></> }

            </div>

    );
}

export default Register;