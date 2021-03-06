import { AppBar, List, ListItem, ListItemText, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { User } from "../models/user";

interface INavbarProps {
    currentUser: User | undefined,
    setCurrentUser: (nextUser: User | undefined) => void 
}

function Navbar(props: INavbarProps) {

    const navigate = useNavigate();

    async function logout() {

        await fetch('http://localhost:8080/quizzard/auth', {
            method: 'DELETE'
        });

        props.setCurrentUser(undefined);
        
    }

    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Typography variant="h5" color="inherit">
                    <List component="nav">
                        <ListItem>
                            <Typography variant="h5" color="inherit">Taskmaster</Typography>
                            {
                                props.currentUser
                                ?
                                <>
                                    <ListItemText inset>
                                        <Typography variant="h6" color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Typography>
                                    </ListItemText>
                                    <ListItemText inset>
                                        <Typography variant="h6" color="inherit" onClick={logout}>Logout</Typography>
                                    </ListItemText>
                                </>
                                :
                                <>
                                    <ListItemText inset>
                                        <Typography variant="h6" color="inherit" onClick={() => navigate('/login')}>Login</Typography>
                                    </ListItemText>
                                    <ListItemText inset>
                                        <Typography variant="h6" color="inherit">
                                            <Link to="/register">Register</Link>
                                        </Typography>
                                    </ListItemText>
                                </>
                            }
                        </ListItem>
                    </List>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;