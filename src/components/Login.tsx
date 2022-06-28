import { SyntheticEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "../models/user";
import ErrorMessage from "./ErrorMessage";

interface ILoginProps {
    currentUser: User | undefined, // union types (this or that)
    setCurrentUser: (nextUser: User) => void
}

function Login(props: ILoginProps) {

    // destructuring assignment
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState<string>(); // TS provides generics

    let updateUsername = (e: SyntheticEvent) => {
        // YOU CANNOT UPDATE PIECES OF STATE DIRECTLY BECAUSE STATE IS IMMUTABLE! USE THE SETTER PROVIDED BY useState!
        // username = (e.target as HTMLInputElement).value; 
        setUsername((e.target as HTMLInputElement).value);
    }

    let updatePassword = (e: SyntheticEvent) => {
        setPassword((e.target as HTMLInputElement).value);
    }

    let login = async (e: SyntheticEvent) => {

        // Prevent whatever default event logic would run otherwise (we only want our logic to run)
        e.preventDefault();
        
        if (!username || !password) {
            setErrorMsg('You must provide a username and a password!');
        } else {
            setErrorMsg('');
        }
        
        try {
            let resp = await fetch('http://taskmasterapi-env.eba-6rxd6zer.us-east-1.elasticbeanstalk.com/taskmaster/auth', {
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
        <>
            <h4>Log into Taskmaster!</h4>
            <div id="login-form">
                <input type="text" id="login-username" placeholder="Enter your username" onChange={updateUsername}/>
                <br/><br/>
                <input type="password" id="login-password" placeholder="Enter your password" onChange={updatePassword}/>
                <br/><br/>
                <button id="login-button" onClick={login}>Login</button>
                <br/><br/>
            </div>
            { errorMsg ? 
                <ErrorMessage errorMessage={errorMsg}/>
                :
                <></>    
            }
        </>
    );

}

export default Login;