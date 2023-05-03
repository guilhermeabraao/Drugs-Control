import { useState } from "react"
import DrugsContainer from "./drugsContainer"
import Header from "./header"
import { DrugContext } from "import/contexts/drugContext";



export default function Main() {

    const [drugs, setDrugs] = useState([]);

    return (
        <>
            <DrugContext.Provider value={{ drugs, setDrugs }}>
                <main className="mainContainer">
                    <Header />
                    <DrugsContainer />
                </main>
            </DrugContext.Provider>

            <style jsx>{`
        .mainContainer{
            width: 100vw;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        `}</style>
        </>
    )
}