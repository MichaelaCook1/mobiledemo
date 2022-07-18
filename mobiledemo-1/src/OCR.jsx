import React from "react";
import Tesseract from "tesseract.js"
import { createWorker } from "tesseract.js";
import Webcam from "react-webcam";
import { useState } from "react";


const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
};

const WebcamCapture = () => {
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState("");
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            var imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
            var convertedImg = new Image();
            convertedImg = imageSrc
            runOCR(convertedImg)
            console.log(convertedImg)
        },
        [webcamRef]
    );

    const runOCR = (input) => {
        Tesseract.recognize(input, "eng", {
            logger: (m) => {
                if (m.status === "recognizing text") {
                    setProgress(m.progress);
                }
            },
        }).then(({ data: { text } }) => {
            setResult(text);
        });
    };

    return (
        <>
            <Webcam
                audio={false}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture photo</button>
            <img src={image} />
            <div>
                <progress value={progress} max={1} />
            </div>
            <div style={{ marginTop: 20, fontSize: 16, color: "black" }}>
                Result: {result}
            </div>
        </>
    );
};


export default WebcamCapture;