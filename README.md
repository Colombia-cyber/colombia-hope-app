# Colombia Hope App 🇨🇴

Una plataforma social-cívica avanzada que permite a los ciudadanos colombianos conectar, participar en discusiones democráticas, y mantenerse informados sobre temas importantes del país.

## ✨ Características Principales

### 🔐 Sistema de Autenticación Avanzado
- **Múltiples proveedores**: JWT backend, Firebase Auth, Google OAuth
- **Registro/Login seguro** con validación completa
- **Gestión de perfiles** de usuario
- **Autenticación en tiempo real**

### 👥 Red Social Ciudadana
- **Feed social** con posts y comentarios
- **Sistema de likes** con notificaciones en tiempo real
- **Creación de contenido** con soporte para imágenes
- **Interacciones sociales** entre ciudadanos

### 🤝 Gestión de Amigos
- **Búsqueda avanzada** de usuarios
- **Sistema de solicitudes** de amistad
- **Gestión completa** de conexiones sociales
- **Estados en línea** en tiempo real

### 💬 Chat en Tiempo Real
- **Mensajería instantánea** entre amigos
- **Indicadores de escritura** y estado en línea
- **Interfaz moderna** y responsiva
- **Notificaciones push** del navegador

### 📰 Noticias y Contenido Cívico
- **Sistema de noticias** categorizado
- **Gestión de contenido** editorial
- **Búsqueda y filtrado** avanzado
- **Tags y categorías** dinámicas

### 🔔 Sistema de Notificaciones
- **Notificaciones en tiempo real** via Socket.IO
- **Notificaciones push** del navegador
- **Centro de notificaciones** integrado
- **Gestión completa** de notificaciones

## 🏗️ Arquitectura

### Backend (Node.js + Express)
- **Express.js** como framework web
- **Socket.IO** para comunicación en tiempo real
- **Prisma ORM** con base de datos SQLite/PostgreSQL
- **JWT** para autenticación y autorización
- **bcryptjs** para hash de contraseñas
- **express-validator** para validación de datos
- **helmet** y **cors** para seguridad

### Frontend (React + TypeScript)
- **React 18** con hooks modernos
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Socket.IO Client** para tiempo real
- **Axios** para HTTP requests
- **Context API** para manejo de estado

### Base de Datos (Prisma Schema)
```prisma
- User (usuarios con perfiles completos)
- Friendship (relaciones de amistad)
- Post (publicaciones sociales)
- Comment (comentarios en posts)
- PostLike (sistema de likes)
- News (artículos y noticias)
- Notification (notificaciones del sistema)
```

## 🚀 Instalación y Configuración

### Prerequisitos
- **Node.js** 18+ 
- **npm** o **yarn**
- **Git**

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Colombia-cyber/colombia-hope-app.git
cd colombia-hope-app
```

### 2. Configurar el Backend

#### Instalar dependencias
```bash
cd backend
npm install
```

#### Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus configuraciones:
# - DATABASE_URL para tu base de datos
# - JWT_SECRET para firmar tokens
# - PORT para el puerto del servidor
```

#### Configurar la base de datos
```bash
# Generar el cliente de Prisma
npm run db:generate

# Crear/actualizar la base de datos
npm run db:push

# (Opcional) Abrir Prisma Studio para gestionar datos
npm run db:studio
```

#### Iniciar el servidor backend
```bash
# Modo desarrollo con auto-reload
npm run dev

# Modo producción
npm start
```

El backend estará disponible en `http://localhost:3001`

### 3. Configurar el Frontend

#### Instalar dependencias
```bash
cd ..  # Volver al directorio raíz
npm install
```

#### Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con:
# - VITE_API_URL=http://localhost:3001/api
# - VITE_SOCKET_URL=http://localhost:3001
# - Configuraciones de Firebase (opcional)
```

#### Iniciar el servidor frontend
```bash
# Modo desarrollo
npm run dev

# Build para producción
npm run build
```

El frontend estará disponible en `http://localhost:5173`

## 🔧 Scripts Disponibles

### Frontend
```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build para producción
npm run preview    # Vista previa del build
```

### Backend
```bash
npm run dev        # Servidor con auto-reload
npm start          # Servidor de producción
npm run db:generate # Generar cliente Prisma
npm run db:push    # Aplicar cambios al esquema
npm run db:studio  # Abrir Prisma Studio
```

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login con email/usuario
- `POST /api/auth/firebase` - Autenticación via Firebase
- `GET /api/auth/me` - Obtener usuario actual
- `POST /api/auth/logout` - Cerrar sesión

### Usuarios
- `GET /api/users` - Buscar usuarios
- `GET /api/users/:id` - Obtener perfil de usuario
- `PUT /api/users/profile` - Actualizar perfil
- `GET /api/users/:id/posts` - Posts de un usuario

### Posts Sociales
- `GET /api/posts` - Feed de posts
- `POST /api/posts` - Crear post
- `GET /api/posts/:id` - Obtener post específico
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comments` - Agregar comentario
- `DELETE /api/posts/:id` - Eliminar post

### Amigos
- `GET /api/friends` - Lista de amigos
- `POST /api/friends/request/:userId` - Enviar solicitud
- `GET /api/friends/requests/received` - Solicitudes recibidas
- `GET /api/friends/requests/sent` - Solicitudes enviadas
- `PUT /api/friends/request/:requestId` - Responder solicitud
- `DELETE /api/friends/:friendshipId` - Eliminar amistad

### Noticias
- `GET /api/news` - Listar noticias
- `GET /api/news/:id` - Artículo específico
- `POST /api/news` - Crear artículo (admin)
- `PUT /api/news/:id` - Actualizar artículo
- `DELETE /api/news/:id` - Eliminar artículo

### Notificaciones
- `GET /api/notifications` - Obtener notificaciones
- `PUT /api/notifications/:id/read` - Marcar como leída
- `PUT /api/notifications/read-all` - Marcar todas como leídas
- `DELETE /api/notifications/:id` - Eliminar notificación

## 🌐 Eventos de Socket.IO

### Cliente → Servidor
- `send_message` - Enviar mensaje de chat
- `typing_start/stop` - Indicadores de escritura
- `join_chat/leave_chat` - Unirse/salir de chats
- `post_liked` - Notificar like en post
- `comment_added` - Notificar nuevo comentario
- `friend_request_sent` - Notificar solicitud enviada

### Servidor → Cliente
- `receive_message` - Recibir mensaje
- `user_online/offline` - Estado de usuarios
- `notification` - Nueva notificación
- `user_typing` - Usuario escribiendo
- `friend_request_received` - Solicitud recibida
- `post_like_notification` - Like recibido

## 🔒 Seguridad

### Autenticación y Autorización
- **JWT tokens** con expiración configurable
- **Middleware de autenticación** en todas las rutas protegidas
- **Validación de entrada** con express-validator
- **Hash de contraseñas** con bcrypt (12 rounds)

### Protección del Servidor
- **Helmet.js** para headers de seguridad
- **CORS** configurado para dominios específicos
- **Rate limiting** para prevenir abuse
- **Validación de Socket.IO** con tokens JWT

### Protección de Datos
- **Sanitización** de entradas de usuario
- **Filtrado de campos** sensibles en respuestas
- **Validación de permisos** en operaciones críticas

## 🎨 Extensibilidad

### Agregar Nuevas Características

#### 1. Nueva Entidad en Base de Datos
```prisma
// En backend/prisma/schema.prisma
model NewEntity {
  id        String   @id @default(cuid())
  // ... campos
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### 2. Nuevas Rutas API
```javascript
// En backend/src/routes/new-feature.js
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  // Lógica del endpoint
});

export default router;
```

#### 3. Nuevos Componentes React
```jsx
// En src/components/new-feature/Component.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const NewComponent = () => {
  // Lógica del componente
  return <div>Nuevo componente</div>;
};

export default NewComponent;
```

#### 4. Nuevos Eventos Socket.IO
```javascript
// En backend/src/utils/socketHandlers.js
socket.on('new_event', (data) => {
  // Manejar evento
  io.emit('response_event', responseData);
});
```

### Integración con APIs Externas
- **APIs gubernamentales** colombianas
- **Servicios de noticias** nacionales
- **Sistemas de verificación** ciudadana
- **Plataformas de participación** democrática

## 🚀 Despliegue

### Desarrollo Local
1. Seguir los pasos de instalación
2. Configurar variables de entorno
3. Ejecutar backend y frontend simultaneamente

### Producción

#### Backend (Node.js)
- **Heroku**, **DigitalOcean**, **AWS**, **Railway**
- Configurar base de datos PostgreSQL
- Variables de entorno de producción
- Certificados SSL

#### Frontend (React)
- **Vercel**, **Netlify**, **GitHub Pages**
- Build estático optimizado
- CDN para assets
- Configuración de rutas

#### Base de Datos
- **PostgreSQL** en la nube (Heroku Postgres, Supabase, PlanetScale)
- Migraciones automáticas con Prisma
- Backups regulares

## 🤝 Contribución

### Cómo Contribuir
1. **Fork** el proyecto
2. **Crear** branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add AmazingFeature'`)
4. **Push** al branch (`git push origin feature/AmazingFeature`)
5. **Abrir** Pull Request

### Guías de Desarrollo
- **ESLint** para linting de código
- **Prettier** para formateo consistente
- **Commits semánticos** (feat, fix, docs, etc.)
- **Testing** con Jest y React Testing Library

### Reportar Issues
- Usar las plantillas de issues
- Incluir pasos para reproducir
- Agregar screenshots si es relevante
- Especificar entorno (OS, navegador, etc.)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Colombia Hope Team** - Desarrollo inicial
- **Comunidad** - Contribuciones y feedback

## 🙏 Agradecimientos

- **Ciudadanos colombianos** por inspirar esta plataforma
- **Comunidad open source** por las herramientas increíbles
- **Contribuidores** que hacen posible este proyecto

---

¡Únete a nosotros en la construcción de una Colombia más conectada y participativa! 🇨🇴✨