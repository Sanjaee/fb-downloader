import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when submitting the form

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
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error(error);
      setResult(null); // Clear the result in case of an error
      setError("Internal Server Error");
    } finally {
      setLoading(false); // Set loading to false after the request is complete
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
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Download Video"}
        </button>
        <div className="support-me">
          <label className="icon-container">Support Me :</label>
          <div className="icons">
            <a
              href="https://www.instagram.com/ahmdafriz4/"
              className="icon icon-instragram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmad-afriza-ez4-ab9173276/"
              className="icon icon-linkedin"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && result.links ? (
        <div className="result">
          <h2>Result:</h2>
          <p>Title: {result.title}</p>
          <p>Duration: {result.duration}</p>
          {result.thumbnail && <img src={result.thumbnail} alt="Thumbnail" />}

          <h3>Download Links:</h3>
          <div>
            {result.links.map((link, index) => (
              <div key={index}>
                <p>Type: {link.type}</p>
                <p>Quality: {link.quality}</p>
                <p>Mute: {link.mute ? "Yes" : "No"}</p>
                <button onClick={() => handleDownload(link.url)}>
                  Download {link.quality}{" "}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="video-not-found">Vidio tidak ditemukan.</p>
      )}
    </div>
  );
}

export default App;
