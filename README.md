# Dashboard de Colaboradores

Dashboard SPA construido con React + Vite + TypeScript para gestionar colaboradores y sus procesos de onboarding.

## Características

- ✅ Listar colaboradores
- ✅ Crear nuevos colaboradores
- ✅ Editar colaboradores existentes
- ✅ Eliminar colaboradores
- ✅ Gestionar onboardings (técnico y bienvenida)
- ✅ Marcar estado de onboarding con fechas

## Estructura del Proyecto

\`\`\`
src/
├── components/          # Componentes React
│   ├── ContributorList.tsx
│   ├── ContributorForm.tsx
│   └── OnboardingItem.tsx
├── hooks/              # Custom hooks
│   └── useContributors.ts
├── services/           # Servicios para API calls
│   └── contributor.service.ts
├── types/              # Definiciones de TypeScript
│   └── contributor.types.ts
├── App.tsx             # Componente principal
├── App.css             # Estilos
└── main.tsx            # Entry point
\`\`\`

## Instalación

\`\`\`bash
npm install
\`\`\`

## Configuración

Crea un archivo `.env` basado en `.env.example`:

\`\`\`env
VITE_API_BASE_URL=http://localhost:8080
\`\`\`

## Desarrollo

\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en `http://localhost:3000`

## Build

\`\`\`bash
npm run build
\`\`\`

## API Endpoints

- `GET /api/v1/contributors` - Listar todos los colaboradores
- `GET /api/v1/contributors/{email}` - Obtener un colaborador
- `POST /api/v1/contributors` - Crear colaborador
- `PUT /api/v1/contributors/{email}` - Actualizar colaborador
- `DELETE /api/v1/contributors/{email}` - Eliminar colaborador
