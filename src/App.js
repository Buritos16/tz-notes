import './App.css';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ListItem from "./components/ListItem";
import {ContextProvider} from "./Context";

function App() {
    return (
        <div className="App">
            <ContextProvider>
                <Header/>
                <div className='main-content'>
                    <Sidebar/>
                    <ListItem/>
                </div>
            </ContextProvider>
        </div>
    );
}

export default App;
