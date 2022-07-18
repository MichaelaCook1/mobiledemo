import './App.css';

import React from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx'
import ResultContainerPlugin from './ResultContainerPlugin.jsx'
import OCR from './OCR.jsx';
import Webcam from "react-webcam";
import WebcamCapture from './OCR.jsx';
import FileRecognize from './fileRecognize';


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
      <h1 className="gov-heading">Input Seizure Details </h1>
      {/* <input accept='image/*' id="icon-button-file" type="file"
        capture="environment" /> */} 
        {/* This is the original method commented out */}
        {/*output element for the image uploaded*/} 
        <p>
        <br></br>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <label for="seizuretype" class= "field-label">
            Select Seizure Category: 
        <select>
          <option value='tobacco' class="choice">Tobacco</option>
          <option value='drugs'class="choice">Drugs</option>
          <option value='firearms'class="choice">Firearms</option>
          <option value='alcohol'class="choice">Alcohol</option>
        </select>
        </label>
        </form>
        </p>
        <p>
        <label class="field-label">Seizure Number: </label>
        <input type = "text"/>
        </p>
        <p>
        <label class="field-label">Seizure Details:  </label>
        <textarea name="seizure-content" rows="2" cols="20"></textarea>
        
        <p><img id="output" width="200"/></p>
        </p>
        </form>
        {/* upload box for the files, presented the option of using the main camera or the file explorer */}
        <input type="file" accept='image/*' name='image' id='file' onChange={loadFile} />
        <p>
          <input type = "submit" class=" button" value = "Submit" onSubmit={hSubmit}/>
        </p>
        <div className = "App-section-title"> Scan Seizure Code </div>
        <Html5QrcodePlugin 
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}/>
          <ResultContainerPlugin results={this.state.decodedResults} />
          <p>
        <label class="field-label">Passenger email for receipt:</label>
        <input type = "text"/>
        </p>
        <div classname= "App-section-title"> Scan passport </div>
        <WebcamCapture/>
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
