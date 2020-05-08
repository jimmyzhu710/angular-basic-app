import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  constructor( private slService: ShoppingListService) { }
  
  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe((index: number)=>{
      this.editMode = true;
      this.editedItemIndex = index;
    });
  }

  onAddItem(form: NgForm){
    const value = form.value;
    this.slService.addIngredient(new Ingredient(value.name, value.amount));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
