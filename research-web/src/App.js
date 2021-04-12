// tutorial https://pjchender.blogspot.com/2019/01/js-javascript-input-file-upload-file.html
import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const $fileUploader = useRef();
  const [addFileTime, setAddFileTime] = useState(false);

  useEffect(() => {
    const photo = $fileUploader.current.files;
    const reader = new FileReader();
    console.log("photo", photo);
    console.log("reader", reader);
    // console.log(reader.readAsDataURL(photo));
    // reader.readAsDataURL(photo);
  }, [addFileTime]);

  return (
    <div>
      {/* multiple => 屬性可以一次上傳多個檔案 */}
      {/* accept => 屬性可以限制上傳檔案的類型 */}
      {/* step1 */}
      <div id="fileContainer">
        <div id="fileWarp">
          <h1>React Upload File</h1>

          <span id="avatar">
            {/* <img src="" id="avatar" alt="Avatar Preview"></img> */}
            <p>AVATAR</p>
          </span>
          <input
            type="file"
            id="file-uploader"
            data-target="file-uploader"
            accept="image/*"
            // multiple="multiple"
            ref={$fileUploader}
            onChange={() => {
              setAddFileTime(!addFileTime);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
