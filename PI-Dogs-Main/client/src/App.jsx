import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Nav from './components/Nav/Nav';
import HomePage from "./components/HomePage/HomePage";
import DetailPage from "./components/Detail/Detail";
import CreateDog from "./components/CreateDog/CreateDog"; // Importa CreateDog en lugar de FormPage
import About from './components/About/About';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav />}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path='/create-dog' element={<CreateDog />} /> {/* Actualiza la ruta */}
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}

export default App;