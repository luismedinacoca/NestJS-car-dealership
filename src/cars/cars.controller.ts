import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  //private cars = ['Toyota', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi'];
  constructor(private readonly carsService: CarsService) {}
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    console.log({ id: id });
    //throw new Error('S.O.S');
    return this.carsService.findOneById(id);
  }
}
