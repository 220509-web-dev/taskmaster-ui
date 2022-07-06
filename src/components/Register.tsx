import {useState} from "react";
import {Button, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {Navigate, useNavigate} from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import { User } from "../models/user";
import { css } from '@emotion/css'
import { RegisterForm } from "../forms/types";
import { isFormValid } from "../forms/is-valid";
import FormBuilder from "../forms/FormBuilder";

interface IRegisterProps {
    currentUser: User | undefined
}

function Register(props: IRegisterProps) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<RegisterForm>({
        firstName: { display: 'First Name', value: '' },
        lastName: { display: 'Last Name', value: '' },
        email: { display: 'Email Address', value: '' },
        username: { display: 'Username', value: '' },
        password: { display: 'Password', value: '', type: 'password' },
    });

    const [errorMsg, setErrorMsg] = useState('');

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    let register = async () => {

        if (!isFormValid(formData)) {
            setErrorMsg('You need to complete the registration form!');
            return;
        }

        try {
            await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            navigate('/confirmation');
            
        } catch (e: any) {
            setErrorMsg(e.message);
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
                width: 25%;`}>
                    
            <Typography align="center" variant="h4">Register for an account</Typography>

            <div
                id="register-form-fields"
                className={css`padding: .5rem;`}>
                <FormBuilder formData={formData} changeHandler={handleChange}/>
            </div>

            <div
                id="options-container"
                className={css`margin: .25rem;`}>

            <Button
                id="nav-to-login-button"
                className={css`float: left;`}
                onClick={() => navigate('/login')}
                variant="contained"
                color="secondary"
                size="medium">Login</Button>

            <Button
                id="register-button"
                className={css`float: right;`}
                onClick={register}
                variant="contained"
                color="primary"
                size="medium">Register</Button>
            
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

export default Register;