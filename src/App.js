import './App.css'
import HomePage from './homepage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Detail from "./detail"

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/detail' element={<Detail/>} />
          <Route path='/' element={<HomePage/>} />
        </Routes> 
      </div>
    </Router>
  )
}

export default App
