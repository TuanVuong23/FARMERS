import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Upload.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage, AiOutlineFile } from 'react-icons/ai';
import api from './api';

export const Upload = () => {
  const [image, setImage] = useState(null);
  const [hdr, setHdr] = useState(null);
  const [fileName, setFileName] = useState('No selected file');
  const [hdrName, setHdrName] = useState('No selected HDR file');
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Thêm state mới

  useEffect(() => {
    // Lấy token từ Local Storage khi component được tạo
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
        // Nếu không có token, hiển thị thông báo và dừng hàm
        alert('Bạn cần đăng nhập');
        return;
      }

      const formData = new FormData();
      formData.append('file', image);
      formData.append('hdr', hdr);

      await api.post('/file/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": 'multipart/form-data',
        },
      });

      // Thực hiện các hành động cần thiết sau khi tải lên thành công
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="main">
      {/* Phần upload ảnh */}
      <form
        action=""
        onClick={() => document.querySelector('.input-field').click()}
      >
        <input
          type="file"
          accept="image/*"
          className="input-field"
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

      {/* Phần upload HDR file */}
      <form
        action=""
        onClick={() => document.querySelector('.hdr-input-field').click()}
      >
        <input
          type="file"
          className="hdr-input-field"
          hidden
          onChange={(e) => {
            setHdr(e.target.files[0]);
            setHdrName(e.target.files[0]?.name || 'No selected HDR file');
          }}
        />

        {hdr ? (
          <div className="upload-row">
            <AiOutlineFile color="#00563B" />
            <span className="upload-content">
              {hdrName}
              <MdDelete
                onClick={() => {
                  setHdr(null);
                  setHdrName('No selected HDR file');
                }}
              />
            </span>
          </div>
        ) : (
          <div className="upload-row">
            <AiOutlineFile color="#00563B" />
            <span className="upload-content">
              {hdrName}
            </span>
          </div>
        )}
      </form>

      <section className="upload-row">
        <AiFillFileImage color="#00563B" />
        <span className="upload-content">
          {fileName}
          <MdDelete
            onClick={() => {
              setFileName('No Selected File');
              setImage(null);
            }}
          />
        </span>
      </section>

      <button onClick={uploadFile}>Upload</button>
    </main>
  );
};
