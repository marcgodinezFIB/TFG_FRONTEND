# BeDJ

## Ideas principales:
- DJ tiene Spotify
- Usuarios se dan de alta en nuestra app (no hace falta que tengan spotify)
- DJ selecciona playlist de la que quiere que se hagan las voatciones
- App hace un random (de momento) para elegir que 4 canciones salen a votación
- Al acabar la votacion (30 segundos) sale que canción se ha elegido ¿solo lo ve el DJ?


## A futuro:
- Se puede ver en preview las canciones de la siguiente votación (eso sale una vez el usuario ya ha votado y esta en el margen de los 30s)
- A futuro se podría hacer algoritmo con preferencias de los clientes (guardar las canciones que estos han votado en una especie de historial)
- Reseña DJ/fiesta/local

## Comentarios:
- Se guarda NOMBRE, ARTISTA Y ÁLBUM de las canciones para evitar repeticiones (excepto si la votación de esta ha pasado del 95%) y poder generar algoritmo que muestre preferencias a futuro


# Casos de uso:
- Registrarse (como DJ y como usuario)
- Login
- Logout
- Seleccionar fiestas disponibles (mediante código o incluso generar QR que al escanear entras a la sesión)
- Votar: Usuario selecciona una de las cuatro canciones que se han sometido a votación. Una vez se vota (la votación dura 30s aprox) se muestra la canción ganadora y se notifica al DJ de cuál ha sido. Se guarda la cancion si no esta en la bd (check PK), Si no existe se guarda y se meten en el contador de votos los que ha tenido. Si existe, se coge el count y se le suman los votos de esta votación
- Ver lista de tendencias: La lista de tendencias está ordenada por votos/apariciones


# Ejecutar en VS:
- npm run start