import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: 2,
      brand: 'Ford', //
      model: 'Mustang',
    },
    {
      id: 3,
      brand: 'Chevrolet',
      model: 'Camaro',
    },
    {
      id: 4,
      brand: 'BMW',
      model: 'X5',
    },
    {
      id: 5,
      brand: 'Mercedes',
      model: 'C63',
    },
    {
      id: 6,
      brand: 'Audi',
      model: 'A4',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: number) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' was not found!`);
    return car;
  }
}
