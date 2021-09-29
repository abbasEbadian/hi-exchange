import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import Index from './jsx';
import Preloader from './jsx/pages/preloader';
import { useSelector } from 'react-redux';
function App() {  
  const loading = useSelector(state => state.preloader.loading)
  return (
    <div className="App">
      <Index />
      <Preloader loading={loading}/>
    </div>
  );
}

export default App;
