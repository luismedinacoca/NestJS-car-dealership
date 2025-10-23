import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private cars = ['Toyota', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi'];
  @Get()
  getAllCars() {
    return this.cars;
  }

  // get car by ID:
  @Get(':id')
  getCarById(@Param('id') id: number) {
    console.log({ id: +id });
    return {
      message: 'success',
      id: +id,
      car: this.cars[+id],
    };
  }
}

/* 
🔬 Testing: 
request: 
GET /localhost:3000/cars/{cars.length} 
status: 200
response: {
  message: "success",
  id: {cars.length},
}
*/
