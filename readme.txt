Proyecto básico de Registro e Inicio de Sesión desarrollado con Node.js y MongoDB para la gestión persistente de usuarios. 
Esta aplicación web utiliza diversas tecnologías y herramientas para su funcionamiento eficiente:

--Node.js: Plataforma de tiempo de ejecución de JavaScript que permite ejecutar código del lado del servidor.

--MongoDB: Base de datos NoSQL utilizada para almacenar y gestionar los datos de los usuarios de forma persistente.

--Nodemon: Herramienta que automatiza el reinicio del servidor Node.js cuando se detectan cambios en 
los archivos del proyecto, lo que facilita el desarrollo y la depuración.

--jsonwebtoken (JWT): Biblioteca para la generación y verificación de tokens JWT, 
utilizada para la autenticación de usuarios y la creación de sesiones seguras.

--Cookie Parser: Middleware de Express utilizado para analizar las cookies enviadas por el cliente, 
lo que facilita la gestión de sesiones y autenticación basada en cookies.

--Dotenv: Módulo que carga variables de entorno desde un archivo .env en el entorno de desarrollo, lo que permite configurar fácilmente 
variables sensibles como claves secretas y credenciales de bases de datos sin exponerlas en el código fuente.

--Express: Marco de aplicación web de Node.js utilizado para la creación de rutas, manejo de 
solicitudes HTTP y configuración del servidor.

--Mongoose: Biblioteca de modelado de objetos para MongoDB en Node.js, que proporciona una interfaz simple y 
basada en esquemas para interactuar con la base de datos MongoDB.

--bcrypt: Biblioteca de hashing de contraseñas utilizada para cifrar las contraseñas de los usuarios antes de 
almacenarlas en la base de datos, lo que garantiza una mayor seguridad.

En resumen, este proyecto combina estas tecnologías para ofrecer una aplicación web robusta y segura que permite a 
los usuarios registrarse, iniciar sesión y gestionar sus cuentas de forma segura y eficiente.