import React, { useEffect } from "react";
import Scanner from "./Scanner";


class Scan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            serialNumber: null,
            setSerialNumber: null,
            setMessage: null
          }
        this.context = {
            actions: null,
            setActions: null
        }


          function onReading({message, serialNumber}) {
              this.setSerialNumber(serialNumber);
              for (const record of message.records) {
                  switch (record.recordType) {
                      case "text":
                          const textDecoder = new TextDecoder(record.encoding);
                          console.log("Message", textDecoder.decode(record.data));
                          this.setMessage(textDecoder.decode(record.data));
                          break;
                     case "url":
                         break;
                     default:
                  }
              }

          }

          this.componentDidMount(
          async function Scan() {
              if ('NDEFReader' in window) {
                  try {
                      const ndef = new window.NDEFReader();
                      await ndef.scan();

                      console.log("Scan started successfullly");
                      ndef.onreadingerror = () => {
                          console.log("Cannot read data from the NFC tag. Try another one?");
                      };

                      ndef.onReading = event => {
                          console.log("NDEF message read.");
                          onReading(event);
                          this.setActions({
                              scan: 'scanned',
                              write: null
                          }); 
                      };
                  } catch(error) {
                      console.log(`Error! Scan failed start: ${error}`);
                  }
              }
              useEffect(() => {
                Scan();
            });

        })
this.render(
    
            <>
            {this.actions.scan === 'scanned' ?  
            <div>
                <p>Serial Number: {this.serialNumber}</p>
                <p>Message: {this.message}</p>
            </div>
            : <Scanner status={this.actions.scan}></Scanner> }
        </>
);
    }



}

export default Scan;