#!/bin/bash

# Crear proyecto base
cd network-monitor-frontend

# Instalar dependencias
bun install @tailwindcss/forms recharts lucide-react
bun install @radix-ui/react-alert-dialog @radix-ui/react-dialog
bun install @radix-ui/react-dropdown-menu @radix-ui/react-toast
bun install class-variance-authority clsx tailwind-merge
bun install tailwindcss postcss autoprefixer
bun install tailwindcss-animate

# Inicializar Tailwind
npx tailwindcss init -p

# Crear estructura de directorios
mkdir -p src/{api,components/{common,dashboard,network,monitoring},hooks,utils}

# Crear archivos principales
touch src/api/{types.ts,api.ts}
touch src/components/common/index.ts
touch src/components/dashboard/{NetworkCard.tsx,NetworkList.tsx}
touch src/components/network/{AddNetworkForm.tsx,NetworkDetail.tsx}
touch src/components/monitoring/{MetricsChart.tsx,StatusCard.tsx}
touch src/hooks/{useWebSocket.ts,useNetworkData.ts}
touch src/utils/helpers.ts

# Configurar CSS base
echo "@tailwind base;
@tailwind components;
@tailwind utilities;" > src/index.css

# Crear archivo de estilos globales
echo ":root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}" > src/styles/globals.css

# Dar permisos de ejecución
chmod +x setup-project.sh

# Mensaje de finalización
echo "Proyecto creado exitosamente!"
echo "Para iniciar el proyecto:"
echo "1. cd network-monitor-frontend"
echo "2. bun start"