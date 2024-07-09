# Kevin Sainz Rojo

from transformers import pipeline
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Inicializa el pipeline de clasificación
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

@app.route('/clasificar', methods=['POST'])
def classify_text():
    data = request.json
    texto = data.get('texto', '')
    candidate_labels = [
    'Política', 'Deportes', 'Religión', 'Economía', 'Salud',
    'Tecnología', 'Educación', 'Ciencia', 'Cultura', 'Entretenimiento',
    'Medio Ambiente', 'Moda', 'Historia', 'Viajes', 'Alimentos',
    'Negocios', 'Música', 'Arte', 'Literatura', 'Noticias'
    ]

    
    resultado_clasificacion = classifier(texto, candidate_labels)
    max_score = max(resultado_clasificacion['scores'])
    label_score = resultado_clasificacion['labels'][resultado_clasificacion['scores'].index(max_score)]
    
    return jsonify({'label': label_score})

if __name__ == '__main__':
    app.run(debug=False, host='localhost', port=5010)
