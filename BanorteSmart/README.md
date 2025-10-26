# Banorte Smart - Implementación en la App Banorte para el Consumo Inteligente de Agua y Electricidad


Una aplicación bancaria móvil moderna que ayuda a los clientes de Banorte a analizar su consumo de electricidad y agua, recibir recomendaciones impulsadas por IA, invertir sus ahorros y gestionar pagos de manera eficiente.


---

## Índice

- [Visión General](#overview)
- [Funcionalidades](#features)
- [Primeros pasos](#getting-started)
- [Estructura del proyecto](#project-structure)
- [Tecnologías empleadas](#technology-stack)

---

## Visión General

Banorte Smart es una innovadora aplicación bancaria que integra el análisis del consumo de electricidad y agua con información impulsada por Inteligencia Artificial. Los usuarios pueden monitorear su consumo semanal de electricidad y agua, identificar picos de consumo, recibir recomendaciones personalizadas de ahorro de Maya (nuestro chatbot de IA) y gestionar los pagos de sus recibos de luz y agua; todo dentro del ecosistema Banorte.



---

## Funcionalidades

###  Autenticación
- Pantalla de inicio de sesión segura con la identidad de Banorte.
- Interfaz amigable e intuitiva

###  Dashboard
- Acceso rápido a todos los servicios financieros y de consumo.
- Integración con el chatbot Maya (IA) para consultas rápidas.
- Menu grid with 6 core services

###  Análisis de consumo de electricidad y agua
- Visualización diaria y semanal del consumo de electricidad y agua.
- 4 semanas de datos históricos con comparación en los periodos más recientes.
- Gráficos interactivos mostrando costos, consumo en kWh o m^3, y patrones visuales.
- Selector de semanas para comparar distintos periodos.
- Detección automática de picos de consumo (2x sobre el promedio).
- Alertas de ahorro y recomendaciones para optimizar el consumo.

###  Maya AI Chatbot
- Impulsado por **Google Gemini Flash 2.5**
- Analiza datos de consumo de electricidad y agua.
- Responde preguntas como:
  - “¿Qué día gasté más?”
  - “¿Cuánto ahorré esta semana?”
  - “Dame recomendaciones para ahorrar energía y agua.”
- Proporciona consejos prácticos y personalizados.
- Botones rápidos para consultas frecuentes.

###  Opciones de pago
- Pago total – liquidar saldo completo.
- Pago en partes – dividir en 3 mensualidades.
- Pago diferido – opción de pagar después.
- Monto personalizado – pago flexible (mínimo $50 MXN).
- Pago total de servicios - pago del total de ambos servicios (luz y agua)

### Inversión del ahorro
- Calcula automáticamente el dinero ahorrado al reducir consumo.
- Permite invertir ese dinero, transformando el ahorro en oportunidades financieras dentro de la app.

### Crédito para imprevistos
- Si el usuario gasta el dinero reservado para servicios, puede solicitar un crédito inmediato para electricidad o agua, evitando retrasos en los pagos y protegiendo su historial financiero.

### Vinculación de cuentas y privacidad
- Al ingresar a “Servicios”, se muestra un pop-up de Términos y Condiciones donde el usuario acepta o rechaza el uso de sus datos.
- El usuario elige entre Electricidad o Agua y selecciona la cuenta que desea vincular.
- Simulación de redireccionamiento a los portales oficiales (CFE o Agua y Drenaje de Monterrey) para vincular cuentas.
Nota: la vinculación completa estará disponible una vez que las instituciones proporcionen sus APIs.
- Una vez vinculadas, el usuario accede a estadísticas detalladas por día y semana, con alertas de picos altos y notificaciones de ahorro.

---

##  Primeros pasos

### Pre requisitos

Antes de comenzar, debes tener instalado:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- A **Google Gemini API Key** - [Get one here](https://ai.google.dev/)

### Paso 1: Descargar el GitHub

1. **Abre tu terminal** (Command Prompt en Windows, Terminal en Mac/Linux)

2. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/oscarcv125/BanorteSmart.git
   ```

3. **Navegar al folder del proyecto:**
   ```bash
   cd BanorteSmart
   ```

### Paso 2: Instalar Paquetes

Instalar los paquetes necesarios:
```bash
npm install
```

Esto descargara todas las librerias y herramientas necesarias para correr la app.

### Paso 3: Configurar la API Key

1. **Crear un archivo `.env`** :
   ```bash
   # En Mac/Linux:
   touch .env

   # En Windows:
   type nul > .env
   ```

2. **Abrir `.env` y poner tu Google Gemini API key:**
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

   Reemplazar `your_api_key_here` con tu API key.

### Paso 4: Ejecución de la App

Iniciar la app localmente:
```bash
npm run dev
```

La app se va a abrir en: **http://localhost:5173/** (o en otro puerto si el 5173 está ocupado)

---


##  Estructura del proyecto

```
banorte-app/
├── public/                    # Static assets
│   └── vite.svg              # Vite logo
│
├── src/                       # Source code
│   ├── assets/               # Images and media files
│   │   ├── Logo.png          # Banorte logo
│   │   └── react.svg         # React logo
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Button.tsx        # Custom button component
│   │   ├── Button.css        # Button styling
│   │   ├── TextField.tsx     # Input field component
│   │   └── TextField.css     # Input field styling
│   │
│   ├── data/                 # Data models and mock data
│   │   └── electricityData.ts # 4 weeks of electricity consumption data
│   │
│   ├── pages/                # Application screens
│   │   ├── Login.tsx         # Login screen
│   │   ├── Login.css         # Login screen styling
│   │   ├── Dashboard.tsx     # Home/Dashboard screen
│   │   ├── Dashboard.css     # Dashboard styling
│   │   ├── Servicios.tsx     # Electricity analysis screen
│   │   ├── Servicios.css     # Servicios styling
│   │   ├── Chatbot.tsx       # Maya AI chatbot screen
│   │   └── Chatbot.css       # Chatbot styling
│   │
│   ├── App.tsx               # Main app component & routing
│   ├── App.css               # App-level styles
│   ├── index.css             # Global styles & design system
│   └── main.tsx              # App entry point
│
├── .env                       # Environment variables (API keys) - NOT committed to Git
├── .env.example              # Example environment file
├── .gitignore                # Files to ignore in Git
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build tool configuration
└── README.md                 # This file!
```

### Archivos clave explicados

#### `package.json`
Enumera todas las bibliotecas (librerías) que necesita tu aplicación y define comandos como 'npm run dev' y 'npm run build'.

#### `src/main.tsx`
El punto de entrada (entry point); aquí es donde tu aplicación comienza a ejecutarse.

#### `src/App.tsx`
El componente principal que controla qué pantalla mostrar (Login, Dashboard, Servicios o Chatbot).

#### `src/index.css`
Contiene el sistema de diseño de Banorte: colores, fuentes (tipografías) y estilos globales usados en toda la aplicación.

#### `src/data/electricityData.ts`
Datos de simulación (mock data) que contienen información del consumo de electricidad de 4 semanas con costos, uso de kWh y fechas.

#### `.env`
Almacena "información secreta" como las llaves de API (API keys). Este archivo nunca se sube a GitHub (está protegido por .gitignore).


---


## Tecnologías empleadas

- Frontend Framework: React 18
- Lenguaje: TypeScript
- Herramienta de construcción: Vite
- Gráficas: Recharts
- Integración de IA: Google Gemini Flash 2.5
- Diseño: CSS3 with CSS Variables
- Version Control: Git





---


