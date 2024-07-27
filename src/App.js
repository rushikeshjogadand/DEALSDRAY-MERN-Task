
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './component/home-page';
import { DashBoard } from './component/Dashboard';
import { AddEmp } from './component/add-emp';
import { ViewEmp } from './component/view-emp';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <section>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='dashboard' element={<DashBoard/>}>
                 <Route path='addemp' element={<AddEmp/>}/>
                 <Route path='viewemp' element={<ViewEmp/>}/>
              </Route>
             
            </Routes>
            

        </section>
      </BrowserRouter>

    </div>
  );
}

export default App;
