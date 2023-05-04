import { useState, createContext, useContext } from "react";

export const FormContext = createContext();

export default function FormProvider({ children }) {
    const drugFormData = new FormData();

    return (
        <FormContext.Provider value={{ drugFormData }}>
            {children}
        </FormContext.Provider>
    );
}

export const useFormData = () => useContext(FormContext);
