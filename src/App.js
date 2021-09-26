import React, {useState, useEffect} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import Index from './jsx';
import Preloader from './jsx/pages/preloader';
import { useSelector } from 'react-redux';
import { Lines } from 'react-preloaders';
function App() {  
  const loading = useSelector(state => state.preloader.loading)
  const [load, setLoad] = useState(false)
  useEffect(()=>{
    setLoad(loading)
  }, [])
  return (
    <div className="App">
      <Index />
      {/* <Lines customLoading={load}/> */}
      <Preloader loading={loading}/>
    </div>
  );
}

export default App;
