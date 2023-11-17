import React, { useState } from "react";
import axios from "axios";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const encodedParams = new URLSearchParams();
    encodedParams.set("URL", videoUrl);

    const options = {
      method: "POST",
      url: "https://facebook-story-saver-and-video-downloader.p.rapidapi.com/",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "7cb05360f8mshca6918f8ea33103p1c4264jsn97b178de78f8",
        "X-RapidAPI-Host":
          "facebook-story-saver-and-video-downloader.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      setResult({ error: "Internal Server Error" });
    }
  };

  const handleDownload = (url) => {
    // You can use the HTML5 download attribute to force a download
    const link = document.createElement("a");
    link.href = url;
    link.download = "downloaded-video.mp4";
    link.click();
  };

  return (
    <div className="container">
      <h1>Facebook Video Downloader</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="videoUrl">Masukan Video URL:</label>
        <input
          type="text"
          id="videoUrl"
          name="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
        <button type="submit">Download Video</button>
      </form>
      {result && (
        <div className="result">
          <h2>Result:</h2>
          <p>Title: {result.title}</p>
          <p>Duration: {result.duration}</p>
          <img src={result.thumbnail} alt="Thumbnail" />

          <h3>Download Links:</h3>
          {result.links.map((link, index) => (
            <div key={index}>
              <p>Type: {link.type}</p>
              <p>Quality: {link.quality}</p>
              <p>Mute: {link.mute ? "Yes" : "No"}</p>
              <button onClick={() => handleDownload(link.url)}>
                Download {link.quality}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
