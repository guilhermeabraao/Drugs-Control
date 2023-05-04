import DrugsContainer from "./drugsContainer"
import Header from "./header"
import DrugProvider from "import/contexts/drugContext";
import FormProvider from "import/contexts/formContext";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'



export default function Main() {



    return (
        <>
            <DrugProvider>
                <FormProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <main className="mainContainer">
                            <Header />
                            <DrugsContainer />
                        </main>
                    </LocalizationProvider>
                </FormProvider>
            </DrugProvider>

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