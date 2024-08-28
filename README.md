# Nygma

En este proyecto se hizo un encriptador de documentos y mensajes que usa AES-256 para lograr ese propósito, esta hecho en NextJS y usa una base de datos MySQL para gestionar los documentos. Las tecnologías que usa son Sequelize, Material UI, Redux y NextAuth para asegurar las rutas de la aplicación.

Las funciones incorporadas son :

Inicio de sesión obligatorio para usar el sistema protegido con JWT.

Rutas protegidas con NextAuth

Posibilidad de cambiar usuario y contraseña.

Posibilidad de cambiar el theme completo del sistema a un modo oscuro o claro.

Se puede agregar, editar y borrar documentos. En la misma sección se maneja un filtro de Redux persistente para buscar por nombre. Además en la sección de gestionar documentos se pueden importar y descargar.

Se puede esconder y recuperar mensajes encriptados en imágenes que se pueden descargar.

Cuando se descarga un documento, se genera en formato HTML, el mensaje es encriptado en AES-256 con la clave seleccionada, al ejecutar el archivo HTML se puede desencriptar el mensaje ingresando la clave que se uso en el documento.

A continuación se muestran unas imágenes del sistema en funcionamiento.

![screenshot]()

Para la correcta instalación del sistema se deben seguir los siguiente pasos.

Se debe renombrar el archivo .env.example a solo .env y editar la configuración con los datos de tu conexión MySQL, el NEXT_PUBLIC_API_URL que seria la URL serial la ruta completa que se esta usando apuntando a "/api", el NEXT_PUBLIC_JWT_SECRET_KEY que seria la clave para generar el JWT. Para la configuración de NextAuth se necesita editar en NEXTAUTH_URL con la url de la aplicación y una contraseña en NEXTAUTH_SECRET.

Una vez editado el archivo .env se deben ejecutar los siguiente comandos : 

```
npm install
```
```
npm run migration:create
```
```
npm run seed
```

Finalmente para iniciar el servidor se debe ejecutar este comando : 

```
npm run dev
```