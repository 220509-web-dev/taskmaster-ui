import { Alert } from "@mui/material";

interface IErrorMessageProps {
    errorMessage: string
}

function ErrorMessage(props: IErrorMessageProps) {
    return (<Alert severity="error">{props.errorMessage}</Alert>)
}

export default ErrorMessage;