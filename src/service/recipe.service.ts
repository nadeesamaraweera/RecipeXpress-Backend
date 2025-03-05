import axios from 'axios';
import { Recipe, SpoonacularResponse } from '../model/recipe.model';
import { SearchHistoryRepository } from '../repository/search-history.repository';

export class RecipeService {
    constructor(
        private searchHistoryRepo: SearchHistoryRepository,
        private apiKey: string
    ) {}

    async searchRecipes(ingredients: string, userId: number): Promise<Recipe[]> {
        try {
            const response = await axios.get<SpoonacularResponse>(
                'https://api.spoonacular.com/recipes/findByIngredients',
                {
                    params: {
                        ingredients,
                        apiKey: this.apiKey,
                        number: 10
                    }
                }
            );

            await this.searchHistoryRepo.createSearchHistory(ingredients, userId);

            return response.data.results.map(recipe => ({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                missedIngredients: recipe.missedIngredients,
                usedIngredients: recipe.usedIngredients,
                likes: recipe.likes
            }));
        } catch (error) {
            throw new Error('Failed to fetch recipes from Spoonacular API');
        }
    }
}