# Winning Horse
## *Proyecto Final de Ciclo DAW 2020-2022*

El proyecto despliega una *interfaz frontend* que permite al usuario interactuar con la aplicación desarrollada para el *Proyecto Fin de Ciclo de Desarrollo de Aplicaciones Web*, elaborado por el alumno *José Pablo Vázquez García*, que consiste en una herramienta de gestión de carreras y apuestas ecuestres.

En el proyecto se ha hecho uso de diversas herramientas aportadas por el framework **React**, como pueden ser los *hooks de estado*, *props* y uso de *componentes*. Además, se han utilizado algunas *librerías* para el desarrollo de utilidades y del diseño, en concreto **Tailwind.css**.

La aplicación consta, además, de una *API Rest* desarrollada en Python bajo el framework **Flask** que sirve los datos a través de peticiones *HTTP*. Esta API Rest puede descargarse desde el siguiente repositorio de **GitHub**:

[Enlace a API Rest](https://github.com/JPabloV85/Proyecto_Final_DAW.git)

### Arranque del proyecto con Docker

1. Arrancar la herramienta **Docker**
2. Descargar el archivo *docker-compose.yml*.
3. Abrir un terminal y ubicarse en el directorio donde se haya almacenado el archivo.
4. Ejecutar el comando **docker compose up**.

### Alternativa de arranque

1. Descargar o clonar la API Rest.
2. Descargar o clonar la aplicación cliente.
3. En un terminal ubicado en el directorio del proyecto *frontend*, ejecutar el comando **npm install** (instalación de dependencias).
4. Una vez completado el paso anterior, ejecutar el comando **npm run start**
5. En un terminal diferente ubicado en el directorio de la API Rest, ejecutar el comando **flask run**

### Acceso a la interfaz del cliente

- Abrir [http://localhost:3000](http://localhost:3000) para visualizar en el navegador.
- Las credenciales para la conexión con una cuenta de cliente de prueba son:
    - Username: pablo
    - Password: alberti

### Acceso a la interfaz del servidor

- Abrir [http://localhost:5000](http://localhost:5000) para visualizar en el navegador.
- Las credenciales para la conexión con una cuenta de administrador de prueba son:
    - Username: pedro
    - Password: alberti