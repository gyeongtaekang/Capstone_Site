import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function App() {
  const [uploadedImages, setUploadedImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => {
      const preview = URL.createObjectURL(file);
      return {
        preview,
        name: file.name,
        translation: preview, // 번역본은 동일 이미지를 가정
      };
    });
    setUploadedImages((prev) => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
  });

  return (
    <div className="container">
      <h1 className="title">캡스톤 디자인 사이트</h1>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p className="dropzone-text">이미지를 드래그하거나 클릭하여 업로드하세요</p>
      </div>

      <h2 className="result-title">결과</h2>
      <div className="image-grid">
        {uploadedImages.map((image, index) => (
          <div key={index} className="image-row">
            <div className="image-column">
              <h3 className="image-title">원본</h3>
              <img src={image.preview} alt={image.name} />
            </div>
            <div className="image-column">
              <h3 className="image-title">번역본</h3>
              <img src={image.translation} alt={`${image.name} (Translation)`} />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .title {
          font-size: 2rem;
          text-align: center;
          margin-bottom: 20px;
          font-weight: bold;
          color: #333;
        }
        .dropzone {
          border: 2px dashed #ccc;
          padding: 20px;
          text-align: center;
          margin-bottom: 20px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .dropzone:hover {
          background-color: #f9f9f9;
        }
        .dropzone-text {
          font-size: 1rem;
          color: #666;
          transition: font-size 0.3s ease;
        }
        @media (max-width: 768px) {
          .dropzone-text {
            font-size: 0.9rem;
          }
        }
        @media (max-width: 480px) {
          .dropzone-text {
            font-size: 0.8rem;
          }
        }
        .result-title {
          font-size: 1.5rem;
          text-align: center;
          margin: 20px 0;
          font-weight: bold;
          color: #444;
        }
        .image-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 20px;
        }
        .image-row {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }
        .image-column {
          flex: 1;
          text-align: center;
        }
        .image-title {
          margin-bottom: 10px;
          font-size: 1rem;
          font-weight: bold;
          color: #555;
        }
        .image-column img {
          width: 100%;
          max-width: 300px;
          height: auto;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
}

export default App;
