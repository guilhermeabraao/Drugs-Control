import { api } from "import/api/api";

const { createContext, useState, useContext } = require("react");

export const DrugContext = createContext({});

export default function DrugProvider({ children }) {
    const [drugs, setDrugs] = useState([]);
    async function loadDrugs() {
        try {
            const { data } = await api.get('/drugs');
            setDrugs(data.results);
        } catch (error) {
            console.log(error.message);
        }

    }

    return (
        <DrugContext.Provider value={{ loadDrugs, drugs, setDrugs }}>
            {children}
        </DrugContext.Provider>
    );
}

export const useDrugContext = () => useContext(DrugContext);