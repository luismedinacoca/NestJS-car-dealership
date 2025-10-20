import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  @Get()
  getAllCars() {
    return ['Toyota', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi'];
  }
  @Get(':id')
  getCarById(@Param('id') id: string) {
    console.log({ id: +id });
    return {
      message: 'success',
      id: +id,
    };
  }
}
