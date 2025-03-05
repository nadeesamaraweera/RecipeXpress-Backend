export interface Recipe {
    id: number;
    title: string;
    image: string;
    missedIngredients: string[];
    usedIngredients: string[];
    likes: number;
}

export interface SpoonacularResponse {
    results: Recipe[];
}