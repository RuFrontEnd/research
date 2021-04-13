// tutorial https://pjchender.blogspot.com/2019/01/js-javascript-input-file-upload-file.html
// Cropper.js https://github.com/fengyuanchen/cropperjs
// Cropper.js tutorial https://www.youtube.com/watch?v=hM9uKmy-BQQ&ab_channel=ThePolyglotDeveloper
import { useEffect, useState, useRef } from "react";
import "./App.css";
import Cropper from "cropperjs"; // npm install cropperjs
import "cropperjs/dist/cropper.min.css";
import man from "./assests/man.jpg";

function App() {
  const $photo = useRef();
  const [isShowPhoto, setIsShowPhoto] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const handleFile = async (e) => {
    console.log(e);
    const photo = e.target.files[0];
    const reader = new FileReader();

    if (photo) {
      reader.readAsDataURL(photo);
      reader.onloadend = () => {
        setImgUrl(reader.result);
        setIsShowPhoto(true);
      };
    }
  };

  useEffect(() => {
    console.log("$photo.current", $photo.current);
    const cropper = new Cropper($photo.current, {
      zoomable: false,
      scalable: false,
      aspectRatio: 16 / 9,
      //   crop: () => {
      //     const canvas = cropper.getCroppedCanvas();
      //     setImgUrl(canvas.toDataURL("image/png"));
      //   },
    });
  }, []);

  return (
    <div>
      {/* multiple => 屬性可以一次上傳多個檔案 */}
      {/* accept => 屬性可以限制上傳檔案的類型 */}
      {/* step1 */}
      <div id="fileContainer">
        <div id="fileWarp">
          <h1>React Upload File</h1>
          <span id="avatar">
            {/* {isShowPhoto && ( */}
            <img
              // src={imgUrl}
              src={man}
              id="photo"
              alt="Avatar Preview"
              ref={$photo}
            ></img>
            {/* )} */}
            {/* {!isShowPhoto && <p>AVATAR</p>} */}
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
