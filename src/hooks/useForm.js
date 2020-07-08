import { useState } from 'react';

const useForm = (initialState, updateState) => {
    const [inputs, setInputs] = useState({ ...initialState });

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        updateState();
        setInputs({ ...initialState })
    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs
    };
}

export default useForm;