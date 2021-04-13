// tutorial https://pjchender.blogspot.com/2019/01/js-javascript-input-file-upload-file.html
// Cropper.js https://github.com/fengyuanchen/cropperjs
// Cropper.js tutorial https://www.youtube.com/watch?v=hM9uKmy-BQQ&ab_channel=ThePolyglotDeveloper
import { useEffect, useState, useRef } from "react";
import "./App.css";
import Cropper from "cropperjs"; // npm install cropperjs
import "cropperjs/dist/cropper.min.css";

function App() {
  test
  const $photo = useRef();
  const [fileContainerStyle, setFileContainerStyle] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [cropImgUrl, setCropImgUrl] = useState("");
  const [finalImgUrl, setFinalImgUrl] = useState("");

  const handleFile = (e) => {
    console.log(e);
    const photo = e.target.files[0];
    const reader = new FileReader();

    if (photo) {
      reader.readAsDataURL(photo);
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
    }
  };

  const handleCrop = () => {
    setFinalImgUrl(cropImgUrl);
    setImgUrl("");
    setFileContainerStyle({});
  };

  useEffect(() => {
    // crop image logic
    if (imgUrl) {
      setFileContainerStyle({
        backgroundColor: "#00000099",
        pointerEvents: "none",
      });
      const cropper = new Cropper($photo.current, {
        zoomable: false,
        scalable: false,
        aspectRatio: 1,
        crop: () => {
          const canvas = cropper.getCroppedCanvas();
          setCropImgUrl(canvas.toDataURL("image/jpg"));
        },
      });
    }
  }, [imgUrl]);

  return (
    <div>
      {/* multiple => 屬性可以一次上傳多個檔案 */}
      {/* accept => 屬性可以限制上傳檔案的類型 */}
      {/* step1 */}
      {imgUrl && (
        <div id="image-cropper-container">
          <img src={imgUrl} id="photo" alt="Avatar Preview" ref={$photo}></img>
          <button
            id="confirm-btn"
            onClick={() => {
              handleCrop();
            }}
          >
            確認
          </button>
        </div>
      )}
      <div id="fileContainer" style={fileContainerStyle}>
        <div id="fileWarp">
          <h1>React Upload File</h1>
          <span id="avatar">
            {finalImgUrl && (
              <img
                src={finalImgUrl}
                id="photo"
                alt="Avatar Preview"
                ref={$photo}
              ></img>
            )}
            {!finalImgUrl && <p>AVATAR</p>}
          </span>
          <input
            type="file"
            id="file-uploader"
            data-target="file-uploader"
            accept="image/*"
            // multiple="multiple"
            onChange={(event) => {
              handleFile(event);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
