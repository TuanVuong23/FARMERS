
import React, { useState, useEffect } from 'react';
import './Upload.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import api from './api';
import Preview from './Preview';

export const Upload = () => {
  const [image, setImage] = useState(null);
  const [hdr, setHdr] = useState(null);
  const [fileName, setFileName] = useState('No selected file');
  const [hdrName, setHdrName] = useState('No selected HDR file');
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [showResultComponent, setShowResultComponent] = useState(false);
  const [isUploadingHdr, setIsUploadingHdr] = useState(false);
  const [uploadFinished, setUploadFinished] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {

    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const uploadFile = async () => {
    try {
      if (!token) {
        alert('Bạn cần đăng nhập');
        return;
      }

      const formData = new FormData();
      formData.append('img', image);
      formData.append('hdr', hdr);

      await api.post('/file/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'multipart/form-data',
        },
      });

      setUploadedImageUrl(URL.createObjectURL(image));

      setShowResultComponent(true);

      setIsUploadingHdr(false);
      setUploadFinished(true); 

      
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <main className="main">
      <div className='content'> 
      {/* Phần upload ảnh */}
      <div className="upload-image">
      <form
        action=""
        onClick={() => document.querySelector('.input-img').click()}
      >
        <input
          type="file"
          accept=".img"
          className="input-img"
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) {
              setImage(files[0]);
            }
          }}
        />

        {image ? (
          <img src={URL.createObjectURL(image)} width={360} height={260} alt={fileName} />
        ) : (
          <>
            <MdCloudUpload color="#00563B" size={60} />
            <p>Browse Images to upload</p>
          </>
        )}
      </form>
      </div>

      {/* Phần upload HDR file */}
      <div className="upload-hdr">
      <form
        action=""
        onClick={() => document.querySelector('.input-hdr').click()}
      >
        <input
          type="file"
          accept=".hdr"
          className="input-hdr"
          hidden
          onChange={({ target: { files } }) => {
            setIsUploadingHdr(true);
            setTimeout(() => setIsUploadingHdr(false), 5000); 
            files[0] && setHdrName(files[0].name);
            if (files) {
              setHdr(files[0]);
              setUploadFinished(false); 
            }
          }}
        />

      {hdr ? (
        <p>{hdrName}</p>
      ) : (
        <>
          <MdCloudUpload color="#00563B" size={60} />
          <p>Browse HDR files to upload</p>
        </>
      )}
      </form>
        </div>
      </div>
    <div>
    <button onClick={() => { uploadFile(); setButtonPopup(true); }} className="upload">Upload</button>

    
    {uploadFinished && <p>Upload finished!</p>}
    </div>

    <Preview trigger={buttonPopup} setTrigger={setButtonPopup}>
      <h2>Upload Finished!</h2>
    </Preview>
    
    </main>
    
  );
};