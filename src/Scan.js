import React, { useCallback, useContext, useEffect, useState} from 'react';
import Scanner from './Scanner'
import { ActionsContext } from "./context";

const Scan = () => {
    const [message, setMessage] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const { actions, setActions} = useContext(ActionsContext);

    const scan = useCallback(async() => {
        if ('NDEFReader' in window) {
            try {
                const ndef = new window.NDEFReader();
                await ndef.scan();

                console.log("Scan started successfully.");
                ndef.onreadingerror = () => {
                    console.log("Cannot read data from the NFC tag. Try another one?");
                };

                ndef.onreadingerror = event => {
                    console.log("NDEF message read.");
                    onReading(event);
                    setActions({
                        scan: 'scanned',
                        write: null
                    });
                };
            } catch (error) {
                console.log(`Error! Scan failed to start: ${error}.`);
            };
        }
    }, [setActions]);

    const onReading = ({message, serialNumber}) => {
        setSerialNumber(serialNumber);
        for(const record of message.records) {
            switch (record.recordType) {
                case "text":
                    const textDecoder = new TextDecoder(record.encoding);
                    setMessage(textDecoder.decode(record.data));
                    break;
                case "url":
                    break;
                default:
            }
        }
    };

    useEffect(() => {
        scan();
    }, [scan]);

    return(
        <>
            {actions.scan === 'scanned' ?
            <div>
                <p>serialNumber: {serialNumber}</p>
                <p>Message: {message}</p>
            </div>
            : <Scanner status={actions.status}></Scanner>}

        </>
    )
}


export default Scan;