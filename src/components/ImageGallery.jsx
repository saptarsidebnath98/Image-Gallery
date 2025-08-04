import React, { useEffect, useState } from "react";
// Image Gallery Component
const ImageGallery = () => {
  const [input, setInput] = useState("");
  const [urlList, setUrlList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);

  const handleAddImage = () => {
    if (input) {
      setUrlList((prevList) => [
        ...prevList,
        { url: input, id: crypto.randomUUID() },
      ]);
      setInput("");
    }
  };

  const handleDeleteImg = (e, id) => {
    setUrlList((prevList) => prevList.filter((item) => item.id !== id));
    e.stopPropagation();
  };

  const handleImgModal = (id) => {
    setShowModal(true);
    const url = urlList.find((url) => url.id === id);
    setModalUrl(url.url);
  };

  const handleBackDropClick = () => {
    setModalUrl(null);
    setShowModal(false);
  };

  console.log(modalUrl);

  useEffect(() => {}, [modalUrl]);

  return (
    <div>
      <h1>Image Gallery Application</h1>
      {/* Input for adding a new image */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter image URL"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddImage}>
          Add Image
        </button>
      </div>
      {/* Display images */}
      <div className="container">
        {/* Map over images array and display them */}
        {urlList.map((url) => (
          <div
            key={url.id}
            className="card"
            onClick={() => handleImgModal(url.id)}
          >
            <img src={url.url} />
            <button
              className="delete-btn"
              onClick={(e) => handleDeleteImg(e, url.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div id="modal" className="back-drop" onClick={handleBackDropClick}>
          <img src={modalUrl} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
