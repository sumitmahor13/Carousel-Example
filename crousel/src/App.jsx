import "../src/App.css";
import React, { useEffect, useState } from "react";

const App = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const url = "https://www.reddit.com/r/aww/top/.json?t=all";
    const res = await fetch(url);
    const result = await res.json();
    const data = result.data.children;
    const list = data
      .filter((item) => item.data.url_overridden_by_dest.includes(".jpg"))
      .map((item) => item.data.url_overridden_by_dest);
    setImages(list);
    setLoading(false);
  };

  const handleLeftClick = () => {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex((idx) => idx - 1);
    }
  };

  const handleRightClick = () => {
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex((idx) => idx + 1);
    }
  };

  useEffect(() => {
    const tid = setInterval(() => {
      handleRightClick(index);
    }, 1000);

    return () => {
      clearInterval(tid);
    };
  }, [index]);

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <div className="conatiner">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="App">
            <button className="left" onClick={handleLeftClick}>
              &#9664;
            </button>
            <img alt="not found" src={images[index]} />
            <button className="right" onClick={handleRightClick}>
              &#9654;
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
