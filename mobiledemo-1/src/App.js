import './App.css';

import React from 'react';
import Scan from "./Scan";
import { useState } from 'react';
import { ActionsContext } from './context';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx'
import ResultContainerPlugin from './ResultContainerPlugin.jsx'


var loadFile = function(event){
  var image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
}

const hSubmit = function(event){
  event.preventDefault();

  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());

  console.log( { value });
  
  }

  const [actions, setActions] = useState(null);
  const {scan} = actions || {};

  const actionValue = {actions, setActions};

  const onHandleAction = (actions) =>{
    setActions({...actions})
  }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decodedResults: []
    }

    // This binding is necessary to make `this` work in the callback.
    this.onNewScanResult = this.onNewScanResult.bind(this);
  }

  render() {
    return (
      <div>
        <section className = "App-section">
        <form class ="form" id="seizureForm">
          {/* label for the page*/}
      <p><label for="file"> Input Seizure Details </label></p>
      {/* <input accept='image/*' id="icon-button-file" type="file"
        capture="environment" /> */} 
        {/* This is the original method commented out */}
        {/*output element for the image uploaded*/} 
        <p>
        <br></br>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <label for="seizuretype">
            Select Seizure Category: 
        <select>
          <option value='tobacco'>Tobacco</option>
          <option value='drugs'>Drugs</option>
          <option value='firearms'>Firearms</option>
          <option value='alcohol'>Alcohol</option>
        </select>
        </label>
        </form>
        </p>
        <p>
        <label>Seizure Number: </label>
        <input type = "text"/>
        </p>
        <p>
        <label>Seizure Details:  </label>
        <textarea name="seizure-content" rows="2" cols="20"></textarea>

        <h1>NFC Scan</h1>
        <div classname="App-container">
          <button onClick={()=>onHandleAction({scan: 'scanning', write: null})} className="btn">Scan</button>
        </div>
        <ActionsContext.Provider value={actionValue}>
          {scan && <Scan/>}
        </ActionsContext.Provider>
        
        <p><img id="output" width="200"/></p>
        </p>
        </form>
        {/* upload box for the files, presented the option of using the main camera or the file explorer */}
        <input type="file" accept='image/*' name='image' id='file' onChange={loadFile} />
        <p>
          <input type = "submit" value = "Submit" onSubmit={hSubmit}/>
        </p>
        <div className = "App-section-title"> Scan Seizure Code </div>
        <Html5QrcodePlugin 
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}/>
          <ResultContainerPlugin results={this.state.decodedResults} />
          <p>
        <label>Passenger email for receipt:</label>
        <input type = "text"/>
        </p>
          </section>
      </div>
      
    );
  }

  onNewScanResult(decodedText, decodedResult) {
    console.log(
      "App [result]", decodedResult);

    // let decodedResults = this.state.decodedResults;
    // decodedResults.push(decodedResult);
    this.setState((state, props) => {
      state.decodedResults.push(decodedResult);
      return state;
    });
  }
}

export default App;
