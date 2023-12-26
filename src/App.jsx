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
    setLoading(true);

    const options = {
      method: "GET",
      url: "https://fb-video-reels.p.rapidapi.com/api/getSocialVideo",
      params: {
        url: videoUrl,
        filename: "Test video",
      },
      headers: {
        "X-RapidAPI-Key": "7cb05360f8mshca6918f8ea33103p1c4264jsn97b178de78f8",
        "X-RapidAPI-Host": "fb-video-reels.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setResult(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setResult(null);
      setError("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (url) => {
    // Membuka tautan unduh di tab baru
    window.open(url, "_blank");
  };

  return (
    <div className="container">
      <h1>Facebook Video Downloader</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="videoUrl">Masukkan URL Video:</label>
        <div className="input-with-button">
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
        </div>
        <div className="support-me">
          <label className="icon-container">Support Me :</label>
          <div className="icons">
            <a
              href="https://www.instagram.com/ahmdafriz4/"
              className="icon icon-instagram"
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
      {result && result.error === false ? (
        <div className="result">
          <h2>Hasil:</h2>
          <p>Judul: {result.description}</p>
          <p>Deskripsi: {result.description}</p>
          {result.picture && <img src={result.picture} alt="Thumbnail" />}

          <h3>Tautan Unduh:</h3>
          <div>
            {result.links && result.links.length > 0 ? (
              result.links.map((link, index) => (
                <div key={index}>
                  <p>Jenis: {link.type}</p>
                  <p>Kualitas: {link.quality}</p>
                  <p>Tanpa Suara: {link.mute ? "Ya" : "Tidak"}</p>
                  <button onClick={() => handleDownload(link.url)}>
                    Unduh {link.quality}{" "}
                  </button>
                </div>
              ))
            ) : (
              <p>Tidak ada tautan unduh.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="video-not-found">Video tidak ditemukan.</p>
      )}
    </div>
  );
}

export default App;
