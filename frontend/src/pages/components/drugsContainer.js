import { api } from "import/api/api"
import { useContext, useEffect } from "react"
import DrugCards from "./drugCards";
import { DrugContext } from "import/contexts/drugContext";


export default function DrugsContainer() {

    const { drugs, setDrugs } = useContext(DrugContext);


    useEffect(() => {
        loadDrugs()
    }, [])

    async function loadDrugs() {
        try {
            const { data } = await api.get('/drugs');
            setDrugs(data.results);
        } catch (error) {
            console.log(error.message);
        }

    }
    return (

        <>
            <div className="drugsContainer">
                <div className="drugCardsDiv">
                    {drugs.map((drug) => (<DrugCards drug={drug} />))}
                </div>
            </div>

            <style jsx>{`
        .drugsContainer{
            height: auto;
            min-height: 84vh;
            width: 90vw;
            margin-top: 15vh;
            margin-bottom: 1vh;
            border: 2px solid black;
            border-radius: 50px;
            box-shadow: 0px 0px 30px;
            background-color:#dcdcdc;
            
        }

        .drugCardsDiv{
            padding: 50px 90px;
            display: flex;
            flex-wrap: wrap;
            gap: 48px;
            align-items: center;
        }
        `}</style>
        </>

    )
}