export interface Recipe {
  id: number;
  name: string;
  cuisine: string;
  difficulty: string;
  cookTimeMinutes: number;
  rating: number;
  image: string;
  ingredients: string[];
  instructions: string[];
}

export interface RecipeResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}