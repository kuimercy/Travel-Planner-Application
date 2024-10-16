import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import "./App.css";
import Homepage from "./HomePage/homePage";



function App() {
  return (
    <Router>

    <div className="App">
    <Routes>
          <Route path="/" element={<Homepage />} />
          

        </Routes>
    </div>
    </Router>
  );
}

export default App;
