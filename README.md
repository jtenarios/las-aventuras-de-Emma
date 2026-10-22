# Cuentos de Emma

Prototipo local de una aplicación web para fomentar la lectura. Usa Angular en el frontend y Python con FastAPI en el backend. Los cuentos se construyen a partir de plantillas guardadas en el propio proyecto, sin API de IA ni servicios de pago.

## Requisitos

- Ubuntu
- Node.js compatible con Angular CLI 22
- Python 3.10 o posterior

## Arranque

Terminal 1:

    cd backend
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    uvicorn app.main:app --reload --port 8000

Terminal 2:

    cd frontend
    npm start

Abre http://localhost:4200.

## Incluye

- Selección entre tres cuentos con los valores de perseverancia, amistad y autonomía.
- Personalización del nombre del personaje lector.
- Vista de lectura con tipografía grande.
- Selector de letra de imprenta, mayúsculas y letra ligada, con las fuentes incluidas localmente.

Las fuentes Andika y Edu NSW ACT Cursive se distribuyen con licencia SIL Open Font License 1.1. Los textos completos de las licencias y los avisos de autoría están en `frontend/src/assets/fonts/`.

La impresión, el guardado de cuentos, las ilustraciones y las funciones interactivas quedan para fases posteriores.
