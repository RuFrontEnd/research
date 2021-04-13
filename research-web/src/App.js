// tutorial https://pjchender.blogspot.com/2019/01/js-javascript-input-file-upload-file.html
import { useState, useRef } from "react";
import "./App.css";

function App() {
  const $fileUploaderRef = useRef();
  const [isShowPhoto, setIsShowPhoto] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const handleFile = async (e) => {
    console.log(e);
    const photo = e.target.files[0];
    const reader = new FileReader();

    if (photo) {
      console.log("photo", photo);
      reader.readAsDataURL(photo);
      reader.onloadend = () => {
        console.log("reader.result", reader.result);
        setImgUrl(reader.result);
        setIsShowPhoto(true);
      };
    }
  };

  return (
    <div>
      {/* multiple => 屬性可以一次上傳多個檔案 */}
      {/* accept => 屬性可以限制上傳檔案的類型 */}
      {/* step1 */}
      <div id="fileContainer">
        <div id="fileWarp">
          <h1>React Upload File</h1>

          <span id="avatar">
            {isShowPhoto && (
              <img src={imgUrl} id="photo" alt="Avatar Preview"></img>
            )}
            {!isShowPhoto && <p>AVATAR</p>}
          </span>
          <input
            type="file"
            id="file-uploader"
            data-target="file-uploader"
            accept="image/*"
            // multiple="multiple"
            ref={$fileUploaderRef}
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
