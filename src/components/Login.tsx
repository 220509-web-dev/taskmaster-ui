import { SyntheticEvent, useState } from "react";
import { User } from "../models/user";

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

    let login = (e: SyntheticEvent) => {

        // Prevent whatever default event logic would run otherwise (we only want our logic to run)
        e.preventDefault();
        
        if (!username || !password) {
            setErrorMsg('You must provide a username and a password!');
        } else {
            setErrorMsg('');
        }

        fetch('http://localhost:8080/quizzard/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        }).then(resp => {
            if (resp.status != 200) {
                setErrorMsg('Could not validate provided credentials!');
            } else {
                return resp.json();
            }
        }).then(data => {
            props.setCurrentUser(data);
        }).catch(err => {
            setErrorMsg('There was an error communicating with the API');
        })

    }

    return (
        props.currentUser ? <p>You are already logged in!</p> : 
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
                <div>
                    <p className="alert">{errorMsg}</p>
                </div>
                :
                <></>    
            }
        </>
    );

}

export default Login;