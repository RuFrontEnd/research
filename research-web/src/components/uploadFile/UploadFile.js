// upload file tutorial https://pjchender.blogspot.com/2019/01/js-javascript-input-file-upload-file.html
// Cropper.js https://github.com/fengyuanchen/cropperjs
// Cropper.js tutorial https://www.youtube.com/watch?v=hM9uKmy-BQQ&ab_channel=ThePolyglotDeveloper
import { useEffect, useState, useRef } from "react";
import "components/uploadFile/UploadFile.css";
import Cropper from "cropperjs"; // npm install cropperjs
import "cropperjs/dist/cropper.min.css";

function UploadFile() {
  const $photo = useRef();
  const [isShowModal, setIsShowModal] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [cropImgUrl, setCropImgUrl] = useState("");
  const [finalImgUrl, setFinalImgUrl] = useState("");

  const handleFile = (e) => {
    console.log(e);
    const photo = e.target.files[0];
    const reader = new FileReader();
    setIsShowModal(true);
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
    setIsShowModal(false);
  };

  useEffect(() => {
    // crop image logic
    if (imgUrl) {
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
    <section>
        {/* multiple => 屬性可以一次上傳多個檔案 */}
        {/* accept => 屬性可以限制上傳檔案的類型 */}
        {imgUrl && (
          <div id="image-cropper-container">
            <img
              src={imgUrl}
              id="photo"
              alt="Avatar Preview"
              ref={$photo}
            ></img>
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
        {isShowModal && <div id="modal-background"></div>}
        <div id="fileContainer">
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
    </section>
  );
}

export default UploadFile;
