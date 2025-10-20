import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private cars = ['Toyota', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi'];
  @Get()
  getAllCars() {
    return this.cars;
  }
  @Get(':id')
  getCarById(@Param('id') id: string) {
    console.log({ id: +id });
    return {
      message: 'success',
      id: +id,
      car: this.cars[+id],
    };
  }
}
