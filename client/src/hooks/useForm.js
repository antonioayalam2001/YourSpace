import { useEffect, useState } from "react";

export const useForm = (initialState = {}, schema) => {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});


    useEffect(() => { 
        createValidators();
    }, [form]);
    
    async function createValidators() {
    let newErrors = {}
        try {
            await schema.validate(form, { abortEarly: false });
            // Realizar acciones con los datos del formulario si la validación es exitosa
            return [];
        } catch (validationErrors) {
            // Manejar los errores de validación
            validationErrors.inner.forEach((error) => {
                newErrors[error.path] = error.message;
            });
            setErrors(newErrors)
        }
    }

    function handleFormChange(e) {
        //Si es un archivo 
        if (e.target.type === "file") {
            setForm({ ...form, [e.target.name]: e.target.files[0] })
            return
        }
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function submitForm(formFields) {
        let newErrors = {}
        try {
            await schema.validate(formFields, { abortEarly: false });
            // Realizar acciones con los datos del formulario si la validación es exitosa
            return true;
        } catch (validationErrors) {
            // Manejar los errores de validación
            validationErrors.inner.forEach((error) => {
                newErrors[error.path] = error.message;
            });
        }
        return false;
    }



    return { form, handleFormChange, errors, submitForm, setErrors };
}