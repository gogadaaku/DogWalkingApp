import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const WebcamCapture = (props) => {
  const [image, setImage] = useState(null);
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("type of image", typeof imageSrc);
    let imageSrc1 = imageSrc.split(",");
     console.log(imageSrc1[1])
    //   setImage(imageSrc1[1]);
    props.dataFromChild(imageSrc1[1]);
  };

  return (
    <div>
      <div>
        <Webcam
          audio={false}
          height={480}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="button-89" onClick={capture}>
          Capture photo
        </button>
      </div>
       {/* {image && <img src={image} alt="Captured" />} */}
    </div>
  );
};

export default WebcamCapture;
