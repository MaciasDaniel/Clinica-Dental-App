import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from './layout/Sidebar'
import Navbar from './layout/Navbar';
import Home from './layout/Home';
import Login from './components/Login';
import PrivateRoute from './layout/PrivateRoute';
import Dashboard from './layout/Dashboard';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import ViewUser from './components/ViewUser';
import About from './components/About';
import Services from './components/Services';
import Dates from './components/Dates';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Sidebar />
        <ToastContainer />
        
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/adduser' element={<AddUser />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/services' element={<Services />} />
          <Route exact path='/dates' element={<Dates />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route path='/user' element={<PrivateRoute />}>
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
          <Route exact path='/edituser/:id' element={<EditUser />} />
          <Route exact path='/:id' element={<ViewUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
