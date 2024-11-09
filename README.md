# API RESTful para Sistema de Evaluación 360 Grados

Este proyecto proporciona una API RESTful para un sistema de evaluación 360 grados de empleados remotos en una empresa de desarrollo de aplicaciones. La API permite la gestión de usuarios, autenticación, creación de departamentos, creación de empleados, y evaluación de empleados.

## Tabla de Contenidos
1. [Instrucciones para configurar y ejecutar el proyecto](#instrucciones-para-configurar-y-ejecutar-el-proyecto)
2. [Explicación de la estructura del proyecto](#explicación-de-la-estructura-del-proyecto)
3. [Postman Collection](#postman-collection)
4. [Swagger API Documentation](#swagger-api-documentation)
5. [Autenticación y Seguridad](#autenticación-y-seguridad)
6. [Rutas Principales](#rutas-principales)
7. [Lógica del Proyecto](#lógica-del-proyecto)
8. [Evaluaciones y Reportes](#evaluaciones-y-reportes)
9. [Pruebas](#pruebas)
10. [Contribución](#contribución)

## Instrucciones para configurar y ejecutar el proyecto

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/silverblade34/backend_nolatech.git
cd backend_nolatech
```

### 2. Instalar dependencias

Instala las dependencias del proyecto utilizando `npm` o `yarn`:

```bash
npm install
```
o

```bash
yarn install
```

### 3. Configurar las variables de entorno

Crea un archivo `.env` en la raíz del proyecto y agrega la siguiente configuración:

```
DB_URI=mongodb://localhost:27017/db_nolatech
PORT=3022
JWT_SECRET=uErLu8r6qD6g81DlDcPa2jBMbSiAg3OzWh3q_N-Y5Hg
```

- `DB_URI`: La URI de tu base de datos MongoDB.
- `PORT`: El puerto en el que la aplicación escuchará las solicitudes.
- `JWT_SECRET`: Clave secreta utilizada para la autenticación JWT.

Nota: Si no has creado la base de datos db_nolatech en tu instancia de MongoDB, asegúrate de crearla manualmente o de permitir que la aplicación lo haga automáticamente al ejecutarse.
### 4. Iniciar el proyecto

Para iniciar el proyecto, ejecuta el siguiente comando:

```bash
npm run start
```
o

```bash
yarn start
```

Esto arrancará el servidor en el puerto especificado en el archivo `.env`. Ahora puedes hacer solicitudes a la API.

### 5. Crear el primer usuario administrador

Cuando inicies el proyecto por primera vez, se creará automáticamente un usuario administrador con los siguientes datos:

- **username**: admin
- **password**: 123456
- **role**: admin

Este usuario tiene permisos para gestionar la creación de todos los mantenimientos.

## Explicación de la estructura del proyecto

El proyecto está estructurado de la siguiente manera:

```
/src
├── /config             # Archivos de configuración (por ejemplo, configuración de base de datos, JWT, etc.)
├── /controllers        # Lógica de controladores para las rutas API
├── /dtos               # Clases de validación para los datos de entrada
├── /interfaces         # Interfaces que definen la estructura de los objetos utilizados en la API 
├── /models             # Modelos de base de datos para empleados, departamentos, evaluaciones, etc.
├── /repositories       # Lógica para interactuar con la base de datos
├── /routes             # Definición de las rutas de la API 
├── /services           # Lógica de negocio y servicios de la API
├── /utils              # Funciones y utilidades adicionales
└── /middlewares        # Middlewares para validación y protección de rutas
```
## Postman Collection

Para facilitar la prueba de la API, hemos proporcionado una **Postman Collection** que contiene ejemplos de solicitudes para cada uno de los endpoints. Puedes importarla en tu Postman utilizando el siguiente enlace:

- [Postman Collection](https://documenter.getpostman.com/view/24761086/2sAY518fEQ)

Este enlace te llevará directamente a la colección de Postman, desde donde podrás ver y probar las solicitudes predefinidas.

## Swagger API Documentation

La documentación de la API está disponible a través de **Swagger UI**. Puedes acceder a ella en la siguiente ruta después de ejecutar el servidor:

```
http://localhost:3022/api-docs
```

Esta ruta te llevará a una interfaz interactiva donde podrás consultar todos los endpoints de la API y realizar pruebas directamente desde el navegador.
## Autenticación y Seguridad

La API utiliza **JSON Web Tokens (JWT)** para la autenticación. Para obtener un token de acceso, los usuarios deben hacer una solicitud `POST` a `/api/auth/login` con sus credenciales:

- **username**: Nombre de usuario.
- **password**: Contraseña.

El token JWT recibido será necesario para realizar solicitudes a rutas protegidas.

## Rutas Principales

### Autenticación:
- **POST /api/auth/register**: Registrar un nuevo usuario (requiere un `RegisterUserDto`).
- **POST /api/auth/login**: Iniciar sesión (requiere `username` y `password`).

### Empleados:
- **GET /api/employees**: Listar todos los empleados (requiere autenticación).
- **GET /api/employees/:id**: Obtener detalles de un empleado (requiere autenticación).
- **POST /api/employees**: Crear nuevo empleado (requiere autenticación de administrador).
- **PUT /api/employees/:id**: Actualizar información de empleado (requiere autenticación de administrador).

### Evaluaciones:
- **POST /api/evaluations**: Crear nueva evaluación 360 (requiere autenticación).
- **GET /api/evaluations**: Listar evaluaciones (requiere autenticación).
- **GET /api/evaluations/:id**: Obtener detalles de una evaluación (requiere autenticación).
- **PUT /api/evaluations/:id**: Actualizar evaluación (requiere autenticación).

### Preguntas:
- **POST /api/questions**: Crear nueva pregunta (requiere autenticación de administrador).
- **GET /api/questions**: Listar preguntas (requiere autenticación).
- **PUT /api/questions/:id**: Actualizar pregunta (requiere autenticación de administrador).

### Reportes:
- **POST /api/reports/submit**: Enviar una evaluación completada (requiere autenticación).
- **GET /api/reports/employee/:id**: Generar reporte de evaluación para un empleado (requiere autenticación).
- **GET /api/reports/department/:id**: Generar reporte por departamento (requiere autenticación).

Tu **README** queda bastante claro y bien estructurado, pero hay algunos ajustes menores que podrías hacer para mejorar la claridad y agregar el último detalle que mencionaste sobre la búsqueda de reportes por empleado y departamento. Aquí te dejo una versión refinada del contenido:

Para reflejar que el **admin** puede crear empleados con el rol `manager` a través del endpoint `/api/employees` y que el registro de nuevos empleados mediante el endpoint de autenticación `/api/auth/register` solo asigna el rol `employee`, puedes actualizar la documentación de la siguiente manera:

---

## Lógica del Proyecto

### Roles de Usuario
El sistema está diseñado para gestionar empleados con tres roles principales:

- **employee**: Empleados que son evaluados.
- **manager**: Empleados con autoridad para evaluar a otros empleados.
- **admin**: Administrador con acceso completo para gestionar empleados, evaluaciones, y roles, además de poder crear departamentos.

### Creación de Empleados

Existen dos formas de crear empleados, dependiendo del rol que se les asigne:

1. **Registro a través de la API de Autenticación** (`/api/auth/register`):
    - Este endpoint permite crear empleados solo con el rol **`employee`**.
    - Los empleados registrados aquí recibirán un rol básico para ser evaluados, y no podrán gestionar a otros empleados.
    - Este registro está destinado a empleados que se registran para participar en el proceso de evaluación 360.

   **Ejemplo de solicitud:**
   ```json
   POST /api/auth/register
   {
        "name": "Prueba",
        "position": "Frontend Developer",
        "departmentId": "672b70ba13df8e8154b8406f",
        "email": "prueba@gmail.com",
        "phone": "+51988775554",
        "hireDate": "2023-10-05",
        "username": "prueba",
        "password": "123456"
   }
   ```

2. **Creación mediante el API de Administración** (`/api/employees`):
    - Solo los usuarios con el rol **`admin`** pueden acceder a este endpoint.
    - El **admin** puede crear empleados con el rol **`employee`** o **`manager`**.
    - Los empleados con el rol **`manager`** tienen la capacidad de evaluar a otros empleados, gestionando el proceso de evaluación 360 para los empleados asignados a su departamento.

   **Ejemplo de solicitud para crear un `manager`:**
   ```json
   POST /api/employees
   {
      "name": "Alexander",
      "position": "Gerente TI",
      "departmentId": "672b70ba13df8e8154b8406f",
      "email": "alexander@gmail.com",
      "phone": "+51988775554",
      "hireDate": "2023-10-05",
      "username": "alexander",
      "password": "123456",
      "role": "manager"
   }
   ```

   **Ejemplo de solicitud para crear un `employee`:**
   ```json
   POST /api/employees
   {
      "name": "Juan",
      "position": "Frontend Developer",
      "departmentId": "672b70ba13df8e8154b8406f",
      "email": "juan@gmail.com",
      "phone": "+51988775554",
      "hireDate": "2023-10-05",
      "username": "juan",
      "password": "123456",
      "role": "employee"
   }
   ```


### Explicación de la Diferencia entre los Roles:

- **Empleado (`employee`)**: Los empleados son los trabajadores que son evaluados por otros usuarios del sistema. Este rol es creado a través de la API de autenticación o por un administrador en el API de empleados.

- **Manager (`manager`)**: Los managers son empleados con autoridad para evaluar a otros empleados. Este rol debe ser asignado explícitamente por un **admin** mediante el endpoint `/api/employees`.

### Evaluaciones
El **admin** puede crear evaluaciones 360 para los empleados, que tienen tres tipos posibles:

- **Self-Assessment**: Evaluación dirigida al mismo empleado (el `employeeId` será el mismo que el `evaluatorId`). Este tipo de evaluación solo tiene un evaluador, que es el mismo empleado.
- **Peer-Assessment**: Evaluación entre empleados del mismo rango o rol. Los evaluadores son empleados con el mismo rol que el empleado evaluado.
- **Manager-Assessment**: Evaluación realizada por los superiores jerárquicos. Los evaluadores son empleados con el rol de **manager**.

Las evaluaciones tienen tres estados:
- **Draft**: La evaluación está en proceso de creación.
- **Submitted**: La evaluación ya está disponible para los evaluadores.
- **Completed**: Todos los evaluadores han completado la evaluación.

Una vez que se crea una evaluación, se pueden agregar preguntas asociadas a la misma. Las preguntas se definen con una **escala de evaluación** que puede ser de tres tipos:
- **Likert**: Preguntas con una escala de 5 opciones, que van desde "Muy Malo" hasta "Excelente".
- **Frecuencia**: Preguntas sobre la frecuencia con que ocurre un comportamiento, con opciones que varían desde "Nunca" hasta "Siempre".
- **Desempeño**: Preguntas sobre el desempeño de un empleado, con opciones que van desde "Muy Bajo" hasta "Muy Alto".

Cada tipo de escala tiene opciones predeterminadas, que se asignan automáticamente cuando se crea una nueva pregunta. El sistema valida que no haya preguntas duplicadas.

### Listado de Evaluaciones

- **Admin**: Si el usuario tiene rol de **admin**, puede ver todas las evaluaciones en el sistema, independientemente de si está asociado como evaluador o no.

- **Employee y Manager**: Si el usuario es un **employee** o **manager**, solo podrá ver las evaluaciones donde esté listado como evaluador y cuyo estado esté en **submitted**. Esto asegura que los empleados y managers solo puedan ver las evaluaciones que realmente están habilitadas para ellos.

### Creación de Reportes de Evaluación

Una vez que una evaluación ha sido completada y los evaluadores han comenzado a responder, se puede generar un reporte de evaluación. El proceso de creación de un reporte está basado en una serie de validaciones que garantizan que solo los evaluadores autorizados puedan generar un reporte válido.

#### Flujo de Creación de Reportes

1. **Validación de Evaluación Existente**:
    - Se verifica si la evaluación proporcionada en el `CreateReportDto` existe en la base de datos. Si no existe, se lanza un error: *"La evaluación no existe."*

2. **Validación de Estado de la Evaluación**:
    - Se verifica que el estado de la evaluación esté en **submitted**. Si el estado no es **submitted**, se lanza un error: *"Esta evaluación aún no está habilitada."*

3. **Autorización del Evaluador**:
    - El sistema verifica si el evaluador está autorizado para generar el reporte. Esto se comprueba verificando si el `evaluatorId` está presente en la lista de evaluadores de la evaluación.

4. **Verificación de Reporte Existente**:
    - El sistema también verifica si ya se ha creado un reporte para esa evaluación, ese empleado y ese evaluador. Si ya existe, se lanza un error: *"Ya se encuentra registrado un registro de esta evaluación para este empleado."*

5. **Verificación de Preguntas y Empleado Asociado**:
    - Se comprueba que la evaluación tenga preguntas asociadas y que el empleado que está siendo evaluado esté registrado en el sistema.

6. **Validación de Respuestas**:
    - Las respuestas proporcionadas para las preguntas se validan para asegurarse de que cada pregunta corresponda a la evaluación correcta. Si alguna pregunta no pertenece a la evaluación, se lanza un error.

7. **Cálculo del Puntaje**:
    - Después de validar las respuestas, el sistema calcula el puntaje total en función de las respuestas dadas y las preguntas de la evaluación.

8. **Creación del Reporte**:
    - Si todas las validaciones pasan, se crea un nuevo reporte con la información del evaluador, el empleado evaluado, el puntaje final y las respuestas detalladas.

9. **Verificación de Todos los Reportes Completados**:
    - Después de crear el reporte, se verifica si todos los evaluadores han enviado sus reportes. Si todos los reportes han sido entregados, el estado de la evaluación se actualiza a **completed**.

10. **Almacenamiento del Reporte**:
    - Finalmente, el reporte se guarda en la base de datos.

#### Búsqueda de Reportes
Los reportes pueden ser buscados por **empleado** o **departamento**, lo que permite generar análisis detallados de las evaluaciones realizadas.

### Flujo de Trabajo
1. El **admin** crea nuevos departamentos y asigna empleados con sus respectivos roles.
2. Los empleados se pueden registrar y asignar a evaluaciones de tipo **self-assessment**, **peer-assessment**, o **manager-assessment**.
3. El **admin** puede crear evaluaciones y asignar evaluadores según el tipo de evaluación seleccionada.
4. Después de crear una evaluación, se pueden agregar preguntas correspondientes al tipo de escala, y las opciones para cada pregunta se definen automáticamente según la escala seleccionada.
5. El estado de la evaluación se puede cambiar de **draft** a **submitted** cuando esté lista para los evaluadores y luego a **completed** una vez que todos los evaluadores hayan completado su parte.
6. Los reportes de evaluación pueden ser consultados por **empleado** o **departamento**, proporcionando un análisis completo de las evaluaciones realizadas.

Este flujo permite a los administradores gestionar de manera eficiente el proceso de evaluación 360, con una clara separación de roles y un manejo detallado de las evaluaciones, preguntas y reportes.

### Pruebas

Se han implementado pruebas para garantizar el correcto funcionamiento de la aplicación. Las pruebas están divididas en dos categorías: **pruebas de controlador** e **integración**.

1. **Pruebas de Controlador**: Se realizaron dos pruebas para verificar que los controladores de las rutas principales se comportan como se espera.
2. **Prueba de Integración**: Se realizó una prueba de integración para asegurar que las rutas interactúan correctamente con la base de datos y otros servicios.

#### Ejecutar las Pruebas

Para ejecutar las pruebas, usa el siguiente comando:

```bash
npm test
```

## Contribución

Si deseas contribuir a este proyecto, por favor realiza un fork del repositorio y crea una solicitud de extracción (pull request) para sugerir cambios.
