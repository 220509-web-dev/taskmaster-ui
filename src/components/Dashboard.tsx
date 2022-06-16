import { User } from "../models/user";

interface IDashboardProps {
    currentUser: User | undefined
}

function Dashboard(props: IDashboardProps) {

    return (
        !props.currentUser ? <p>You are not logged in!</p> :
        <>
            <h1>Welcome, {props.currentUser.firstName}!</h1>
        </>
    );

}

export default Dashboard;