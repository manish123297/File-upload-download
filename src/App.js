
import './App.css';
import Header from './routes/Header.component';
import {Routes,Route} from "react-router-dom"
import Form from './components/form.component';
import FilesList from './routes/fileList.component';
function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route  path='/' element={<Header></Header>}>
          <Route  index element={<Form></Form>}></Route>
          <Route  path='/lists' element={<FilesList></FilesList>}></Route>
        </Route>
      </Routes>
    

    

    </div>
  );
}

export default App;
