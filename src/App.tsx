import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-icons/dist/index';
import React from 'react';
import './styles/App.css';
import {MeteorsView} from "./features/meteor/MeteorsView";


function App() {

    return (
    <div className="App">
      <MeteorsView></MeteorsView>
    </div>
  );
}

export default App;
