import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Ford', //
      model: 'Mustang',
    },
    {
      id: uuid(),
      brand: 'Chevrolet',
      model: 'Camaro',
    },
    {
      id: uuid(),
      brand: 'BMW',
      model: 'X5',
    },
    {
      id: uuid(),
      brand: 'Mercedes',
      model: 'C63',
    },
    {
      id: uuid(),
      brand: 'Audi',
      model: 'A4',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' was not found!`);
    return car;
  }

  create(createCarDto: CreateCarDto) {
    //create({ brand, model }: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      //brand: createCarDto.brand, || brand,
      //model: createCarDto.model, || model,
      ...createCarDto,
    };
    this.cars.push(car);
    return car;
  }
}
