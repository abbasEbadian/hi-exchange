import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Index from './jsx';
import { Lines } from 'react-preloaders';

function App() {
  return (
    <div className="App">
      <Index />
      <Lines />
    </div>
  );
}

export default App;
