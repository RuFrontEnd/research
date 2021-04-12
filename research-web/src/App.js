// tutorial https://pjchender.blogspot.com/2019/01/js-javascript-input-file-upload-file.html
import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const $fileUploader = useRef();
  const [addFileTime, setAddFileTime] = useState(0);

  useEffect(() => {
    console.log("$fileUploader", $fileUploader);
    console.log("$fileUploader.current.dataset", $fileUploader.current.dataset);
  }, [addFileTime]);

  useEffect(() => {
    console.log("$fileUploader.current.files", $fileUploader.current.files);
  }, [addFileTime]);

  return (
    <div>
      {/* multiple => 屬性可以一次上傳多個檔案 */}
      {/* accept => 屬性可以限制上傳檔案的類型 */}
      <div className="fileContainer">
        <div className="fileWarp">
          <input
            type="file"
            id="file-uploader"
            data-target="file-uploader"
            accept="image/*"
            multiple="multiple"
            ref={$fileUploader}
            onChange={() => {
              setAddFileTime(addFileTime + 1);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
