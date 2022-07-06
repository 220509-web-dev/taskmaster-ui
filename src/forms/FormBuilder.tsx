import { FormControl, Input, InputLabel } from "@mui/material";
import { SyntheticEvent } from "react";

interface IFormBuilderProps {
    formData: any;
    changeHandler: (e: SyntheticEvent) => void;
}

function FormBuilder(props: IFormBuilderProps) {

    const formElements = Object.keys(props.formData).map(key => {
        const field = props.formData[key];
        return (
            <FormControl key={key} margin="normal" fullWidth>
                <InputLabel htmlFor={key}>{field.display}</InputLabel>
                <Input
                    id={key}
                    name={key}
                    type={field.type ?? 'text'}
                    onChange={props.changeHandler}
                />
            </FormControl>
        )
    })
    
    return formElements.reduce((prev, curr) => <>{prev}{curr}</>);

}

export default FormBuilder;