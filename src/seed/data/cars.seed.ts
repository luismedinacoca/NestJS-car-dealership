import { v4 as uuid } from 'uuid';
import { Car } from '../../cars/interfaces/car.interface';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    model: 'Corolla',
  },
  {
    id: uuid(),
    brand: 'Ford',
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
