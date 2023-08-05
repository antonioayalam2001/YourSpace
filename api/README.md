# Your Space
La aplicación cuenta con un sistema de autenticación de usuarios, que permite el registro de nuevos usuarios y el inicio de sesión de usuarios ya registrados. Una vez iniciada la sesión, el usuario puede crear contenido, que se almacena en una base de datos, y puede ser visualizado por otros usuarios. El usuario también puede editar y eliminar su propio contenido.

## ¿Cómo funciona?
La aplicación cuenta con dos modos, en caso de que el servidor no se encuentre arriba al momento de querer visualizar el sitio se puede acceder a la versión de Demo, que permite interactuar con la mayoría de la interfaz gráfica, pero no permite la creación de contenido.

### Requerimientos
En caso de querer probar el proyecto en su computadora, se requiere tener instalado [Node.js](https://nodejs.org/es/) y MySQL.
Las credenciales necesarias para MySQL se encuentran en el archivo `config.js` en la carpeta `database`.

Creación de la base de datos:
```sql
CREATE DATABASE blog;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    img VARCHAR(255) ,
);

CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    desc VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(100) NOT NULL,
    user__id INT NOT NULL, 
    FOREIGN KEY (user__id) REFERENCES users(id)
);

```


