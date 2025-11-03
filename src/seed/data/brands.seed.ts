import { v4 as uuid } from 'uuid';
import { Brand } from '../../brands/entities/brand.entity';

export const BRANDS_SEED: Brand[] = [
  {
    id: uuid(),
    name: 'Toyota',
  },
  {
    id: uuid(),
    name: 'Ford',
  },
  {
    id: uuid(),
    name: 'Chevrolet',
  },
  {
    id: uuid(),
    name: 'BMW',
  },
  {
    id: uuid(),
    name: 'Mercedes',
  },
  {
    id: uuid(),
    name: 'Audi',
  },
];
