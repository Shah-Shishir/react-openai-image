import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import GenerateImages from './components/GenerateImages';

// Styling
import "./App.scss";

export const App = () => {

    return <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<GenerateImages/>} />
            <Route exact path='/create-images' element={<GenerateImages/>} />
        </Routes>
    </BrowserRouter>;
};
