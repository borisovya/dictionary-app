import React from 'react';
import {
  BrowserRouter as Router,
  Route, Routes,

} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import StarredWords from './components/StarredWords';

function App() {
  return (
    <Router>
      <div className='app'>
        <Header/>
        <Routes>

          <Route path="/" element={<Home /> } />
          <Route path="/starred" element={<StarredWords />} />

          {/*<Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
