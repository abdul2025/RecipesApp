import { Subscription } from 'rxjs/Subscription';
import { ShoppingListService } from './../shoppingList.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slFrom: NgForm;
  private subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppingService: ShoppingListService) { }
  ngOnInit() {
    this.subscription = this.shoppingService.startedEdit.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingService.getIngredient(index);
      this.slFrom.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  addSubmit(form: FormControl) {
    console.log(form);
    const newIng = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingService.update(this.editedItemIndex, newIng);
    } else {
      this.shoppingService.addingIng(newIng);
    }
    this.editMode = false;
    this.slFrom.reset();
  }

  clearAll() {
    this.editMode = false;
    this.slFrom.reset();
  }

  onDelete() {
    this.clearAll();
    this.shoppingService.delete(this.editedItemIndex);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
