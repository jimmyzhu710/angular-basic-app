import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as RecipesActions from '../store/recipe.action';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>('https://ng-course-recipe-book-2476e.firebaseio.com/recipes.json');
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return { ...recipe, Ingredient: recipe.ingredients ? recipe.ingredients : [] }
            });
        }),
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes);
        })
    )

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.http.put('https://ng-course-recipe-book-2476e.firebaseio.com/recipes.json', recipesState.recipes);
        })
    );
    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}