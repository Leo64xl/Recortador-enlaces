import { useState } from 'react'
import { IoCopy, IoCut, IoHeart } from 'react-icons/io5'
import './App.css'

function App() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const shortenUrl = async () => {
    const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`)
    const data = await response.json()
    setShortUrl(data.shorturl)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    window.alert('URL copiada al portapapeles')
  }

  return (
    <div className="container">
      <h1 className='cajita'>Recortador de URLs <IoCut /></h1>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Ingresa una URL Valida"
      />
      <button onClick={shortenUrl}>Generar URL <IoHeart /></button>
      {shortUrl && (
        <p>
          URL generada: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          <IoCopy onClick={copyToClipboard} style={{ cursor: 'pointer', marginLeft: '10px' }} />
        </p>
      )}
    </div>
  )
}

export default App