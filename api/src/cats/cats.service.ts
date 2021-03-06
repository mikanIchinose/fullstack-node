import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cats.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    { name: 'わさび', age: 12, breed: 'マンチカン' },
  ];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findByName(name: string): Cat[] {
    return this.cats.filter((cat) => cat.name === name);
  }

  findNames(): string[] {
    return this.findAll().map((cat) => cat.name);
  }

  getCats(): Cat[] {
    return this.findAll();
  }
}
