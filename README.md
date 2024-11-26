# Network Monitor Frontend

React-based frontend for real-time network monitoring visualization.

## Tech Stack

- React 18
- TypeScript
- TailwindCSS
- React Query (para manejo de estado y cache)
- Recharts (para gráficas)
- WebSocket client
- shadcn/ui (para componentes)

## Project Structure

```
network-monitor-frontend/
├── src/
│   ├── api/
│   │   ├── networks.ts
│   │   └── websocket.ts
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   ├── networks/
│   │   │   ├── NetworkList.tsx
│   │   │   ├── NetworkCard.tsx
│   │   │   └── NetworkForm.tsx
│   │   └── monitoring/
│   │       ├── MetricsChart.tsx
│   │       ├── SpeedDisplay.tsx
│   │       └── StatusIndicator.tsx
│   ├── hooks/
│   │   ├── useNetwork.ts
│   │   └── useWebSocket.ts
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── NetworkDetail.tsx
│   │   └── Settings.tsx
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       └── helpers.ts
├── public/
├── .env
└── package.json
```

## Features

1. Dashboard principal con:

   - Lista de redes monitoreadas
   - Métricas en tiempo real
   - Gráficas de rendimiento
   - Indicadores de estado

2. Vista detallada de red con:

   - Gráficas históricas
   - Métricas detalladas
   - Cambios de ruta
   - Configuración de alertas

3. Configuración:
   - Gestión de redes
   - Configuración de umbrales
   - Preferencias de visualización

## Propuesta de desarrollo paso a paso:

1. Configuración inicial

   - Setup de React + TypeScript
   - Configuración de TailwindCSS
   - Instalación de dependencias

2. Componentes base

   - Layout principal
   - Navegación
   - Componentes comunes

3. Integración con API

   - Configuración de React Query
   - Implementación de hooks personalizados
   - Cliente WebSocket

4. Visualizaciones
   - Implementación de gráficas
   - Componentes de métricas
   - Indicadores en tiempo real

¿Empezamos con alguna parte específica o prefieres revisar primero esta estructura?
