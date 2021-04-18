import './App.css';
import MainListContainer from "./components/MainListContainer";
import {SnackbarProvider} from "notistack";

function App() {
    return (
        <div className="App">
            <SnackbarProvider maxSnack={3}>
                <MainListContainer/>
            </SnackbarProvider>
        </div>
    );
}

export default App;
