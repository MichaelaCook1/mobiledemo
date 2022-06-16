import React, {useContext}from "react";
import { ActionsContext } from "./context";

class Scanner extends React.Component {
    render(){
        <div className="scanner">
        <p className="scanner-exit" onClick={()=>setActions({...actions, scan: null})}>X</p>
        <div className="scanner-container">
          <p className="scanner-text">
            Scanning...
          </p>
        </div>
      </div>
    }

}

export default Scanner;