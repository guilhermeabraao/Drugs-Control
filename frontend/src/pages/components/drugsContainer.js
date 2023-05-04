import { useEffect } from "react"
import DrugCards from "./drugCards";
import { useDrugContext } from "import/contexts/drugContext";


export default function DrugsContainer() {

    const { loadDrugs, drugs } = useDrugContext();


    useEffect(() => {

        loadDrugs()

    }, [])

    return (

        <>
            <div className="drugsContainer">
                <div className="drugCardsDiv">
                    {drugs.map((drug) => (<DrugCards drug={drug} key={drug.id} />))}
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