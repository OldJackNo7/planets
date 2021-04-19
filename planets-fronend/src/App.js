import './App.css';
import MainListContainer from "./components/MainListContainer";
import {SnackbarProvider} from "notistack";
import {ModuleProvider} from "./utils/ModuleContext";
import {CaptainProvider} from "./utils/CaptainContext";
import React from "react";

function App() {
    return (
        <div className="App">
            <ModuleProvider>
                <CaptainProvider>
                    <SnackbarProvider maxSnack={3}>
                        <MainListContainer/>
                    </SnackbarProvider>
                </CaptainProvider>
            </ModuleProvider>
        </div>
    );
}

export default App;
