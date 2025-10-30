# Diagrama de Secuencia UML - Módulo de Autos

## Descripción
Este diagrama muestra las interacciones entre los componentes del módulo de autos en NestJS: CarsModule, CarsController, CarsService y CreateCarDto.

## Diagrama de Secuencia

```mermaid
sequenceDiagram
    participant Client as Cliente HTTP
    participant Module as CarsModule
    participant Controller as CarsController
    participant Service as CarsService
    participant DTO as CreateCarDto
    participant Data as Datos (Array)

    Note over Module: Inicialización del módulo
    Module->>Controller: Registra CarsController
    Module->>Service: Registra CarsService
    Module->>Controller: Inyecta CarsService

    Note over Client,Data: Flujo de petición GET /cars
    Client->>Controller: GET /cars
    Controller->>Service: findAll()
    Service->>Data: Accede al array de autos
    Data-->>Service: Retorna array de autos
    Service-->>Controller: Retorna array de autos
    Controller-->>Client: Respuesta HTTP con lista de autos

    Note over Client,Data: Flujo de petición GET /cars/:id
    Client->>Controller: GET /cars/:id
    Controller->>Controller: Valida UUID con ParseUUIDPipe
    Controller->>Service: findOneById(id)
    Service->>Data: Busca auto por ID
    alt Auto encontrado
        Data-->>Service: Retorna auto encontrado
        Service-->>Controller: Retorna auto
        Controller-->>Client: Respuesta HTTP con auto
    else Auto no encontrado
        Data-->>Service: No encuentra auto
        Service-->>Controller: Lanza NotFoundException
        Controller-->>Client: Error 404 Not Found
    end

    Note over Client,Data: Flujo de petición POST /cars
    Client->>Controller: POST /cars
    Controller->>DTO: Valida datos con CreateCarDto
    DTO->>DTO: Valida brand (IsString)
    DTO->>DTO: Valida model (IsString)
    alt Datos válidos
        DTO-->>Controller: Datos validados
        Controller-->>Client: Retorna CreateCarDto (implementación pendiente)
    else Datos inválidos
        DTO-->>Controller: Error de validación
        Controller-->>Client: Error 400 Bad Request
    end

    Note over Client,Data: Flujo de petición PATCH /cars/:id
    Client->>Controller: PATCH /cars/:id
    Controller->>Controller: Valida UUID con ParseUUIDPipe
    Controller-->>Client: Retorna payload (implementación pendiente)

    Note over Client,Data: Flujo de petición DELETE /cars/:id
    Client->>Controller: DELETE /cars/:id
    Controller->>Controller: Valida UUID con ParseUUIDPipe
    Controller-->>Client: Retorna confirmación (implementación pendiente)
```

## Componentes del Diagrama

### CarsModule
- **Responsabilidad**: Configuración y registro de componentes
- **Funciones**:
  - Registra CarsController como controlador
  - Registra CarsService como proveedor
  - Maneja la inyección de dependencias

### CarsController
- **Responsabilidad**: Manejo de peticiones HTTP
- **Endpoints**:
  - `GET /cars` - Obtener todos los autos
  - `GET /cars/:id` - Obtener auto por ID
  - `POST /cars` - Crear nuevo auto
  - `PATCH /cars/:id` - Actualizar auto
  - `DELETE /cars/:id` - Eliminar auto

### CarsService
- **Responsabilidad**: Lógica de negocio y acceso a datos
- **Métodos**:
  - `findAll()` - Retorna todos los autos
  - `findOneById(id)` - Busca auto por ID y lanza excepción si no existe

### CreateCarDto
- **Responsabilidad**: Validación de datos de entrada
- **Validaciones**:
  - `brand`: Debe ser string
  - `model`: Debe ser string (obligatorio)

## Notas de Implementación

1. **Validación de UUID**: Se usa `ParseUUIDPipe` para validar IDs en las rutas
2. **Manejo de Errores**: El servicio lanza `NotFoundException` cuando no encuentra un auto
3. **Validación de DTOs**: Se usa `class-validator` para validar datos de entrada
4. **Implementaciones Pendientes**: Los métodos POST, PATCH y DELETE están parcialmente implementados

## Flujo de Datos

1. **Cliente** envía petición HTTP al **Controller**
2. **Controller** valida parámetros y datos de entrada
3. **Controller** delega lógica de negocio al **Service**
4. **Service** accede a los datos y aplica reglas de negocio
5. **Service** retorna resultado al **Controller**
6. **Controller** retorna respuesta HTTP al **Cliente**

