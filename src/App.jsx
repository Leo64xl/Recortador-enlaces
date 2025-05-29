import { useState } from "react";
import { TbScissors, TbLink, TbCopy, TbBrandGithub } from "react-icons/tb";
import "./App.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shortenUrl = async () => {
    const response = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`
    );
    const data = await response.json();
    setShortUrl(data.shorturl);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      MySwal.fire({
        toast: true,
        position: 'top',
        icon: 'success',
        title: '¡Enlace copiado!',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
    });
  };

  return (
    <div>
      <div className="container">
        <h1 className="cajita">
          Recortador Enlaces <TbScissors size={28} />
        </h1>

        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Ingresa una URL válida"
        />

        <button onClick={shortenUrl}>
          Generar URL <TbLink size={22} style={{ marginLeft: 8 }} />
        </button>
        {shortUrl && (
          <p>
            URL generada:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <TbCopy
              onClick={() => copyToClipboard(shortUrl)}
              size={22}
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                verticalAlign: "middle",
              }}
              title="Copiar"
            />
          </p>
        )}
      </div>
      <footer>
        <p>Recortador de Enlaces - Hecho por Leo 🦁</p>
        <p>
          Usando la API de{" "}
          <a href="https://is.gd/" target="_blank" rel="noopener noreferrer">
            is.gd
          </a>{" "}
          <a
            href="https://github.com/Leo64xl"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <TbBrandGithub size={18} style={{ verticalAlign: "middle" }} />
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;