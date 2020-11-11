import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Orange', 3),
  ];

  ingrAdded = new Subject<Ingredient[]>();
  startedEdit = new Subject<number>()
  constructor() { }


  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index) {
    return this.ingredients[index];
  }
  addingIng(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingrAdded.next(this.ingredients.slice());
  }

  addIngredeints(ingrs: Ingredient[]) {
    this.ingredients.push(...ingrs);
    this.ingrAdded.next(this.ingredients.slice());
    console.log('shopping services');
  }

  update(index: number, newIngre: Ingredient) {
    this.ingredients[index] = newIngre;
    this.ingrAdded.next(this.ingredients.slice());
  }


  delete(index) {
    this.ingredients.splice(index, 1);
    this.ingrAdded.next(this.ingredients.slice());
  }






}
