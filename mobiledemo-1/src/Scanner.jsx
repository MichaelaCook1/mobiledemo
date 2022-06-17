import React, {useContext}from "react";
import { ActionsContext } from "./context";

class Scanner extends React.Component {
  constructor(props){
    super(props);
    this.context = {
      actions: ActionsContext,
      setActions: ActionsContext
    }
  }
    render(){
      return(
        <div className="scanner">
        <p className="scanner-exit" onClick={()=>this.setActions({...this.actions, scan: null})}>X</p>
        <div className="scanner-container">
          <p className="scanner-text">
            Scanning...
          </p>
        </div>
      </div>
      );
    }

}

export default Scanner;