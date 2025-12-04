# Frontend - DashBoard OnBoardings App

Este proyecto es la interfaz de usuario para un sistema de **onboarding** que permite listar, crear, actualizar y eliminar colaboradores, así como visualizar el estado de los procesos de onboarding y enviar notificaciones automáticas.

## Tecnologías utilizadas

- **React (Vite + JSX)**
- **CSS personalizado**
- **Tailwind CSS personalizado**
- **Fetch API / Services para comunicación con el backend**

## Instrucciones para correr el proyecto

1. Tener instalado **Git** en tu máquina local.  
2. Elegir una carpeta donde guardar el proyecto.  
3. Abrir la terminal de Git (**Git Bash**) en esa carpeta.  
4. Clonar el repositorio:  
   ```bash
   git clone https://github.com/ChristianDuarteR/Prueba-Tecnica-_Banco-de-Bogota---FrontEnd.git
5. Abrir el proyecto en tu IDE favorito o navegar hasta el directorio desde la terminal.
6. Instalar dependencias:
    ```bash
    npm install
    ```
7.Ejecutar el proyecto:
    ```bash
    npm run dev
    ```
# Envio de correos 

- Es posible enviar alertas manual/automaticamente a los colaboradores con onboardings menores a 7 dias como en este caso
<img width="818" height="782" alt="image" src="https://github.com/user-attachments/assets/e3c05906-4e24-4a8d-8ac9-a2cc64f971dd" />

<img width="1570" height="794" alt="image" src="https://github.com/user-attachments/assets/42c36179-e52a-4838-883d-fa87a428f826" />

# Organizador visual diario mediante Calendario

- Utilizando la libreria FullCalender es posible utilizar nuestros Modelos para mapearlos en eventos
<img width="913" height="871" alt="image" src="https://github.com/user-attachments/assets/3faff40c-7a44-498b-9876-641ddfe739d3" />

# Funcionalidades Criticas

- **Gestión de colaboradores:** listar, crear, actualizar y eliminar.
- **Visualización de onboardings** registrados en el sistema.
- **Disparar notificaciones de onboarding** (manual o automática).
- **UI moderna** con tarjetas y estilos personalizados.

## Conexión con el backend

Este frontend se conecta a un backend Spring Boot disponible en `http://localhost:8080`.  
Las rutas utilizadas incluyen:

### Contributors
- `GET /api/v1/contributors` → Obtener todos los colaboradores
- `GET /api/v1/contributors/{email}` → Obtener colaborador por email
- `POST /api/v1/contributors` → Crear nuevo colaborador
- `PUT /api/v1/contributors/{email}` → Actualizar colaborador
- `DELETE /api/v1/contributors/{email}` → Eliminar colaborador

### Onboardings
- `GET /api/v1/onboardings` → Obtener todos los onboardings

### Emails
- `GET /api/v1/emails` → Obtener estado de notificaciones
- `POST /api/v1/emails?manual={true|false}` → Disparar notificaciones de onboarding (manual o automática)

## Authors

- **Christian Duarte** - @ChristianDuarteR

## Licencia

Este proyecto fue desarrollado con fines académicos/técnicos como parte de una prueba.  
Uso libre y educativo.
