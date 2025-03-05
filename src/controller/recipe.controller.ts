import { Request, Response } from 'express';
import { RecipeService } from '../service/recipe.service';

export class RecipeController {
    constructor(private recipeService: RecipeService) {}

    async searchRecipes(req: Request, res: Response) {
        try {
            const ingredients = req.query.ingredients as string;
            const userId = req.user?.id;

            if (!ingredients) {
                return res.status(400).json({ error: 'Ingredients parameter is required' });
            }

            if (!userId) {
                return res.status(401).json({ error: 'User not authenticated' });
            }

            const recipes = await this.recipeService.searchRecipes(ingredients, userId);
            res.json(recipes);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search recipes' });
        }
    }
}