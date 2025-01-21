import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css'
import ReceipeGenerationPage from './pages/ReceipeGenerationPage';
import Header from './components/Header';
import Footer from './components/Footer';
import GeneratedInformation from './pages/GeneratedInformation';
import Favourites from './pages/Favourites';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
function App() {
  return (
    
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<ReceipeGenerationPage/>}/>
      <Route path='/generatedReceipe' element={<GeneratedInformation/>}/>
      <Route path='/favourite' element={<Favourites/>}/>
      <Route path='/recipe' element={<Recipes/>}/>
      <Route path='/recipeDetails' element={<RecipeDetails/>}/>
    </Routes>
    <Footer/>

    </BrowserRouter>
  );
}

export default App;
