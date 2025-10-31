import  { ChangeEvent } from "react";
import Form from "react-bootstrap/esm/Form";

type ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

type Input = {
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
    onChange: ChangeHandler;
    value: string;
    isInvalid?: boolean;
    validationMsg?: string;
}

const CustomInput = ({name, label, type, placeholder, onChange, value, validationMsg, isInvalid}:Input) => {
    return (
        <Form.Group className="mb-3" controlId={name} >
        <Form.Label>{label}</Form.Label>
        <Form.Control 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            onChange={onChange}
            value={value} 
            isInvalid={isInvalid}
        />
            <Form.Control.Feedback type="invalid">
                {validationMsg}
            </Form.Control.Feedback>
        </Form.Group>
    )
    

}

export default CustomInput;