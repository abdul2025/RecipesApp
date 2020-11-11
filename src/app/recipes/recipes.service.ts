import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  // recipeSelected = new EventEmitter<Recipe>();
  recipeChanges = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('A Test Recipes', 'This is a simple desc for a Recipe',
      'https://www.hindustantimes.com/rf/image_size_444x250/HT/p2/2017/06/29/Pictures/_a9de93ca-5ca6-11e7-a7a5-fdf01393e65b.jpg', [
      new Ingredient('Meat', 1),
      new Ingredient('tomato', 3)
    ]),

    new Recipe('A kkkkk Recipes', 'This is a simple desc for a Recipe',
      'https://www.eatwell101.com/wp-content/uploads/2019/08/tuscan-salmon-recipe.jpg',
      [
        new Ingredient('souce', 1),
        new Ingredient('mayo', 3)]),
  ];
  constructor(private slService: ShoppingListService) { }
  getRecipes() {
    // using slice so we get only a copy of the array
    return this.recipes.slice();
  }

  addIngredientToShppingList(ingredients: Ingredient[]) {
    this.slService.addIngredeints(ingredients);

  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanges.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanges.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanges.next(this.recipes.slice());
  }
}
