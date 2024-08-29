# Nygma

En este proyecto se hizo un encriptador de documentos y mensajes que usa AES-256 para lograr ese propósito, esta hecho en NextJS y usa una base de datos MySQL para gestionar los documentos. Las tecnologías que usa son Sequelize, Material UI, Redux y NextAuth para asegurar las rutas de la aplicación.

Las funciones incorporadas son :

Inicio de sesión obligatorio para usar el sistema protegido con JWT.

Rutas protegidas con NextAuth.

Posibilidad de cambiar usuario y contraseña.

Posibilidad de cambiar el theme completo del sistema a un modo oscuro o claro.

Se puede agregar, editar y borrar documentos. En la misma sección se maneja un filtro de Redux persistente para buscar por nombre. Además en la sección de gestionar documentos se pueden importar y descargar.

Se puede esconder y recuperar mensajes encriptados en imágenes que se pueden descargar.

Cuando se descarga un documento, se genera en formato HTML, el mensaje es encriptado en AES-256 con la clave seleccionada, al ejecutar el archivo HTML se puede desencriptar el mensaje ingresando la clave que se uso en el documento.

A continuación se muestran unas imágenes del sistema en funcionamiento.

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEihNkoT2CHqDQCBsrmaAIBUpP3BuRfRrT-2Ut-yYtZwdXEpij8ZVWKqIVsJbi2LScx1Y3CMyPDCbDeOi6eG8bwmAbiXd5lcCi2c3s0lyPOjUSDGN2qi8UDKDUPco6eSJs6jND7bYE-8N0j5Fn7w5qsxp07wdewfyFkFvnvgacPaOVVRrYIve2I9B4pJv3U/s1855/n1.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhO4Tpjo8A5hVZk_vbmLkMtA7b6TzcEiJJR8HyaVwbFGmc0u4uBYA27Zceaf7gN6W1Y5tXeUes-OOYU3vtexnJhpn94MnpsoFP-72hZ_VyYCJC01D3t431EYJJZBmDv4VdCrWK98OCHUFaA1iuXkjZhAluETQQrg5HdQPQn5fz5WE0fuoZQPeWHgcEsd0E/s1855/n2.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1Gx95EUgFtcUbjvLfBfWqtJe3Vhuq7Q7Ud-TAQP5wQToR8W2ljtcQpAxQFYsaWnl4rC8XUY5GZJepBKDxFES3dpopwbKXxEykdK97BjS6yAXtvRjRsI8T1VKcZpgM4LhQG9UtbmVRYZVe4soyPn5FL5osOnhX07zxG-6rxgkP54yAbzcbdeylIWJIaBE/s1843/n3.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh6Xqu0T9biMa_5xgyERqxOp1GeopE2TvB_T8aHpiC4zWtZWJpjftAFThzLWc7gH9hC-uHUcSQrDCIZDt521G5PA1dQ5wpnKRWj-mrLrQY-mIDHMklh7LXAjP2KO4W5HIfMoong2ipEj6ZvIH1e7VTKAxGYeivejPbZPZ1MldZBT6bLuhXOPOy0Yu-WGQc/s1855/n4.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmqBvRMpJps9fp_sDQKswvE8EBWRE4cfugMeEQttu86De1v4L39wxMtXVqJsJkB4mEbmWpHwfOuC0_hyHkolJJGOMvXjnyRy9uiRqYDN4OIdfUVoDnCJRGZ1oOxaKDqdioe4_c26_WlCrrEXut3GB_j9ZyZx1JwHBB_nYcuNrKHwWx73l_UuLxq_5pvfQ/s1843/n5.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi62Ujpg8GKjlvaDWLqJ_Hqk0Z0vdsf7KHcQ-wSuM6LNInu6kIFQ5eVPhZsEYGMz-X71PamyMvcV09RJK6ysEvGGerKYOM86_kjDONr4QrLZS61k7E3CusEMO3TocsY996qqDEe41Gd7ctYKSwOWO1Ffa0rPkSIwxwKVcAeA8zLF-C2TxHHjlWHl4xp0No/s1860/n6.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjsrxze6IlqjtUGLq-_sLgjWNWRHevRDnTyQvbEAC6L0hvf5-jQ5VzpSNy9SODUrUSGXnS-K9CBIX6kefAB8T8wo_Bbti7A5xPkD_LiestBpHLaXYwWiHJq6BgmsYRKpaHSL_Gdo5tkFnrusUYsP1RQLA7_tHTxFvaCux1NLkRuZW8y4K08Y2wv_WamNSc/s1860/n7.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOIrLkg70TxovrLAUgQp8a_2dIm-OtY9QU6xurTNVxw0UQ69R3GYbXUPS48v1lEQ65cGOCe9f0e3k4po2y-SGpLYSSBDwBhqbAtsvVx_sSwZ4GGKqoqY3A08GJBwffv3g8s7kUDpKDW4vETOnPl28f_upvvj2YU93S3bXJD3oOnwoHRavLZ80hfcagjX0/s1860/n8.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgxOhd4ZmaiJQ1JasuD_XO7pkBD2X41NAI6x9R3_Wd6Vy6-UyKj7sBTfki7USCpGQWYcf7BuW-1k90QzJwKYHjpC0B2K-Qv-aEMGK_fJVTM7AdY6ks2Q8oWg-ZCNF8B-G8vTLBXfyXIaIIAZ468-RCgZFW-vL8qrbsEnpxlqLrRRNGRte6kjwQ4zgI5nSU/s1860/n9.png)

Para la correcta instalación del sistema se deben seguir los siguiente pasos.

Se debe renombrar el archivo .env.example a solo .env y editar la configuración con los datos de tu conexión MySQL, el NEXT_PUBLIC_API_URL que seria la URL serial la ruta completa que se esta usando apuntando a "/api", el NEXT_PUBLIC_JWT_SECRET_KEY que seria la clave para generar el JWT. Para la configuración de NextAuth se necesita editar en NEXTAUTH_URL con la url de la aplicación y una contraseña en NEXTAUTH_SECRET.

Una vez editado el archivo .env se deben ejecutar los siguiente comandos : 

```
npm install
```
```
npm run migrate
```
```
npm run seed
```

Finalmente para iniciar el servidor se debe ejecutar este comando : 

```
npm run dev
```