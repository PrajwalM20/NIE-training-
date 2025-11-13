import './App.css';
import { Route, Routes, Link } from 'react-router-dom';   
import { Login } from './components/Login'; 
import { Search } from './components/Search'; 
import { AddTrainers } from './components/AddTrainers'; 
import { TrainerList } from "./components/TrainerList";
import { UpdateTrainers } from "./components/UpdateTrainers"; 

function App() {
  return (
    <>
      <div className="p-3 fw-bold d-flex align-items-center justify-content-center rounded"
       style={{ backgroundColor: "#C9F4C4", color: "#1E5631" }}>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/search">Search</Link>
          </li>
        </ul>

        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/add">Add Trainer</Link>
          </li>
        </ul>

        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/list">Trainer List</Link>
          </li>
        </ul>

      </div>

      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/add" element={<AddTrainers />} />
          <Route path="/list" element={<TrainerList />} />
          <Route path="/update" element={<UpdateTrainers />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
