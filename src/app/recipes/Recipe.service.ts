import { Recipe } from './recipe.model';

export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://cookieandkate.com/images/2020/03/vegan-chana-masala-recipe-2.jpg'),
        new Recipe('Another Test Recipe', 'This is simply a test', 'https://cookieandkate.com/images/2020/03/vegan-chana-masala-recipe-2.jpg')
    ];

    getRecipes(){
        return this.recipes.slice();
    }
}