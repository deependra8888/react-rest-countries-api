import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./Details";

import Header from "./Header";
import Main from "./Main";

function App(props) {

   

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                
            <Route path="/" element={<Main />} />
            <Route path="/:name" element={<Details />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;