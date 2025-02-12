import { useState } from "react";
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCodeImg, setQrCodeImg] = useState(''); //  Separate state for QR Code

  const handleSubmit = () => {
    axios.post('http://localhost:3000/api/short', { originalUrl })
      .then((res) => {
        const { shortUrl, qrCodeImg } = res.data; // Directly use response data
        setShortUrl(shortUrl);  // Store the full shortened URL as-is
        setQrCodeImg(qrCodeImg); // Store QR code separately
        console.log("API response", shortUrl, qrCodeImg);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>URL Shortener</h1>
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter URL to shorten"
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            style={styles.inputField}
          />
          <button onClick={handleSubmit} type="button" style={styles.button}>
            Shorten
          </button>
          {shortUrl && (
            <div className="mt-6 text-center">
              <p className="text-lg font-medium">Shortened URL:</p>
              <a
                href={shortUrl}
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2"
                target="_blank"
              >
                {shortUrl.replace('http://localhost:3000/', '')}
              </a>
              {qrCodeImg && (
                 <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                  <img src={qrCodeImg} alt="Generated QR Code" style={{ maxWidth: "200px" }} />
                </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline CSS styles
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    padding: "16px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "32px",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: "24px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s ease",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background 0.3s ease",
  },
};

export default App;
