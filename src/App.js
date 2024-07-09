// Kevin Sainz Rojo

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Inicia el indicador de carga
    setResultado(null); // Resetea el resultado anterior
    try {
      const response = await axios.post('http://localhost:5010/clasificar', { texto });
      setResultado(response.data.label);
    } catch (error) {
      console.error("Error al clasificar el texto:", error);
      setResultado("Error al clasificar el texto");
    } finally {
      setLoading(false); // Detiene el indicador de carga
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Clasificador de Texto</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Ingresa el texto aquí"
              rows="4"
              cols="50"
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
        {loading && <p>Procesando...</p>} {/* Indicador de carga */}
        {resultado && (
          <div>
            <h2>Clasificación:</h2>
            <p>{resultado}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
