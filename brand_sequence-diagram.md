# Brand Module Sequence Diagram

This document contains sequence diagrams for all operations in the Brand module, showing the interaction between the Controller, Service, DTOs, and Entity.

## Module Structure

The Brand module consists of:
- **BrandsModule**: Module that configures the Controller and Service
- **BrandsController**: Handles HTTP requests
- **BrandsService**: Contains business logic
- **CreateBrandDto**: DTO for creating brands
- **UpdateBrandDto**: DTO for updating brands
- **Brand Entity**: Entity representing a brand

## Complete Sequence Diagram

```mermaid
sequenceDiagram
    participant Client
    participant BrandsController
    participant CreateBrandDto
    participant UpdateBrandDto
    participant BrandsService
    participant Brand
    
    Note over Client,Brand: CREATE OPERATION
    Client->>BrandsController: POST /brands (body: CreateBrandDto)
    BrandsController->>CreateBrandDto: Validate DTO (name: string, minLength: 1)
    CreateBrandDto-->>BrandsController: Validated DTO
    BrandsController->>BrandsService: create(createBrandDto)
    BrandsService->>Brand: Create new Brand instance
    Note right of Brand: Generate UUID id<br/>Set name from DTO<br/>Set createdAt timestamp
    Brand-->>BrandsService: Brand entity
    BrandsService->>BrandsService: Push brand to brands array
    BrandsService-->>BrandsController: Return Brand entity
    BrandsController-->>Client: HTTP 201 Created (Brand)
    
    Note over Client,Brand: FIND ALL OPERATION
    Client->>BrandsController: GET /brands
    BrandsController->>BrandsService: findAll()
    BrandsService->>BrandsService: Access brands array
    BrandsService-->>BrandsController: Return Brand[] array
    BrandsController-->>Client: HTTP 200 OK (Brand[])
    
    Note over Client,Brand: FIND ONE OPERATION
    Client->>BrandsController: GET /brands/:id
    BrandsController->>BrandsController: Validate id (ParseUUIDPipe)
    BrandsController->>BrandsService: findOne(id: string)
    BrandsService->>BrandsService: Search brand by id in array
    alt Brand found
        BrandsService-->>BrandsController: Return Brand entity
        BrandsController-->>Client: HTTP 200 OK (Brand)
    else Brand not found
        BrandsService->>BrandsService: Throw NotFoundException
        BrandsService-->>BrandsController: NotFoundException
        BrandsController-->>Client: HTTP 404 Not Found
    end
    
    Note over Client,Brand: UPDATE OPERATION
    Client->>BrandsController: PATCH /brands/:id (body: UpdateBrandDto)
    BrandsController->>BrandsController: Validate id (ParseUUIDPipe)
    BrandsController->>UpdateBrandDto: Validate DTO (name: string, minLength: 1)
    UpdateBrandDto-->>BrandsController: Validated DTO
    BrandsController->>BrandsService: update(id, updateBrandDto)
    BrandsService->>BrandsService: findOne(id) - Validate existence
    alt Brand found
        BrandsService->>BrandsService: Map brands array
        Note right of BrandsService: Find brand by id<br/>Merge updateBrandDto with existing<br/>Update updatedAt timestamp<br/>Preserve id
        BrandsService->>Brand: Update Brand properties
        Brand-->>BrandsService: Updated Brand entity
        BrandsService-->>BrandsController: Return updated Brand
        BrandsController-->>Client: HTTP 200 OK (Brand)
    else Brand not found
        BrandsService->>BrandsService: Throw NotFoundException (from findOne)
        BrandsService-->>BrandsController: NotFoundException
        BrandsController-->>Client: HTTP 404 Not Found
    end
    
    Note over Client,Brand: DELETE OPERATION
    Client->>BrandsController: DELETE /brands/:id
    BrandsController->>BrandsController: Validate id (ParseUUIDPipe)
    BrandsController->>BrandsService: remove(id: string)
    BrandsService->>BrandsService: findOne(id) - Validate existence
    alt Brand found
        BrandsService->>BrandsService: Filter brands array (remove by id)
        BrandsService-->>BrandsController: Return success message
        BrandsController-->>Client: HTTP 200 OK (message)
    else Brand not found
        BrandsService->>BrandsService: Throw NotFoundException (from findOne)
        BrandsService-->>BrandsController: NotFoundException
        BrandsController-->>Client: HTTP 404 Not Found
    end
```

## Individual Operation Diagrams

### Create Brand Operation

```mermaid
sequenceDiagram
    participant Client
    participant BrandsController
    participant CreateBrandDto
    participant BrandsService
    participant Brand
    
    Client->>BrandsController: POST /brands
    activate BrandsController
    BrandsController->>CreateBrandDto: Validate name (string, minLength: 1)
    activate CreateBrandDto
    CreateBrandDto-->>BrandsController: Validated
    deactivate CreateBrandDto
    BrandsController->>BrandsService: create(createBrandDto)
    activate BrandsService
    BrandsService->>Brand: Create { id: uuid(), name, createdAt }
    activate Brand
    Brand-->>BrandsService: Brand instance
    deactivate Brand
    BrandsService->>BrandsService: Push to brands array
    BrandsService-->>BrandsController: Brand
    deactivate BrandsService
    BrandsController-->>Client: 201 Created
    deactivate BrandsController
```

### Find All Brands Operation

```mermaid
sequenceDiagram
    participant Client
    participant BrandsController
    participant BrandsService
    
    Client->>BrandsController: GET /brands
    activate BrandsController
    BrandsController->>BrandsService: findAll()
    activate BrandsService
    BrandsService->>BrandsService: Access brands array
    BrandsService-->>BrandsController: Brand[]
    deactivate BrandsService
    BrandsController-->>Client: 200 OK (Brand[])
    deactivate BrandsController
```

### Find One Brand Operation

```mermaid
sequenceDiagram
    participant Client
    participant BrandsController
    participant BrandsService
    
    Client->>BrandsController: GET /brands/:id
    activate BrandsController
    BrandsController->>BrandsController: Validate UUID
    BrandsController->>BrandsService: findOne(id)
    activate BrandsService
    BrandsService->>BrandsService: Search brand by id
    
    alt Brand exists
        BrandsService-->>BrandsController: Brand
        BrandsController-->>Client: 200 OK (Brand)
    else Brand not found
        BrandsService-->>BrandsController: NotFoundException
        BrandsController-->>Client: 404 Not Found
    end
    deactivate BrandsService
    deactivate BrandsController
```

### Update Brand Operation

```mermaid
sequenceDiagram
    participant Client
    participant BrandsController
    participant UpdateBrandDto
    participant BrandsService
    participant Brand
    
    Client->>BrandsController: PATCH /brands/:id
    activate BrandsController
    BrandsController->>BrandsController: Validate UUID
    BrandsController->>UpdateBrandDto: Validate name (string, minLength: 1)
    activate UpdateBrandDto
    UpdateBrandDto-->>BrandsController: Validated
    deactivate UpdateBrandDto
    BrandsController->>BrandsService: update(id, updateBrandDto)
    activate BrandsService
    BrandsService->>BrandsService: findOne(id)
    
    alt Brand exists
        BrandsService->>BrandsService: Map and update brand
        Note right of BrandsService: Merge updateBrandDto<br/>Update updatedAt<br/>Preserve id
        BrandsService->>Brand: Update properties
        activate Brand
        Brand-->>BrandsService: Updated
        deactivate Brand
        BrandsService-->>BrandsController: Brand
        BrandsController-->>Client: 200 OK (Brand)
    else Brand not found
        BrandsService-->>BrandsController: NotFoundException
        BrandsController-->>Client: 404 Not Found
    end
    deactivate BrandsService
    deactivate BrandsController
```

### Delete Brand Operation

```mermaid
sequenceDiagram
    participant Client
    participant BrandsController
    participant BrandsService
    
    Client->>BrandsController: DELETE /brands/:id
    activate BrandsController
    BrandsController->>BrandsController: Validate UUID
    BrandsController->>BrandsService: remove(id)
    activate BrandsService
    BrandsService->>BrandsService: findOne(id)
    
    alt Brand exists
        BrandsService->>BrandsService: Filter brands array
        BrandsService-->>BrandsController: Success message
        BrandsController-->>Client: 200 OK (message)
    else Brand not found
        BrandsService-->>BrandsController: NotFoundException
        BrandsController-->>Client: 404 Not Found
    end
    deactivate BrandsService
    deactivate BrandsController
```

## Data Flow Summary

1. **Client Request** → HTTP request to BrandsController
2. **Validation** → DTOs validate input data, ParseUUIDPipe validates ID format
3. **Service Logic** → BrandsService processes business logic
4. **Entity Manipulation** → Brand entity is created/updated/accessed
5. **Response** → Controller returns appropriate HTTP response

## Error Handling

- **NotFoundException**: Thrown when a brand with the given ID is not found (used in findOne, update, remove)
- **Validation Errors**: DTOs validate input and throw validation errors if data is invalid
- **UUID Validation**: ParseUUIDPipe ensures ID format is valid before processing

