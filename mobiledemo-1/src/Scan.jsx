import React, { useCallback, useContext, useEffect, useState } from "react";
import {ActionsContext} from "./context";


class Scan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setActions: null,
            setMessage: null,
            setSerialNumber: null
          }

          const [message, setMessage] = useState('');
          const [serialNumber, setSerialNumber] = useState('');
          const { actions, setActions} = useContext(ActionsContext);

          function onReading({message, serialNumber}) {
              setSerialNumber(serialNumber);
              for (const record of message.records) {
                  switch (record.recordType) {
                      case "text":
                          const textDecoder = new TextDecoder(record.encoding);
                          console.log("Message", textDecoder.decode(record.data));
                          setMessage(textDecoder.decode(record.data));
                          break;
                     case "url":
                         break;
                     default:
                  }
              }

          }

          function Scan(props) {
              if ('NDEFReader' in window) {
                  try {
                      const ndef = new window.NDEFReader();
                      await ndef.scan();

                      console.log("Scan started successfullly");
                      ndef.onreadingerror = () => {
                          console.log("Cannot read data from the NFC tag. Try another one?");
                      };

                      ndef.onreading = event => {
                          console.log("NDEF message read.");
                          onReading(event);
                          setActions({
                              scan: 'scanned',
                              write: null
                          }); 
                      };
                  } catch(error) {
                      console.log(`Error! Scan failed start: ${error}`);
                  }
              }

        }
    }



}

export default Scan;