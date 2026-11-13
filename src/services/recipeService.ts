import { Recipe, RecipeResponse } from "../types/recipe";
import { delay } from "../utils/delay";

const BASE_URL = "https://dummyjson.com/recipes";

// 1) CUSTOM ASYNC FUNCTION (async/await) + PRE-BUILT ASYNC (fetch & response.json)
export async function getRecipes(keyword: string): Promise<Recipe[]> {
  await delay(800); // custom async: simulasi server lambat
  const response = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(keyword)}&limit=10`
  ); // pre-built async
  if (!response.ok) {
    throw new Error("Gagal mengambil daftar resep");
  }
  const result: RecipeResponse = await response.json(); // pre-built async
  return result.recipes;
}

// 2) PROMISE CONSTRUCTOR + .then() + resolve() + reject()
export function getRecipeById(id: number): Promise<Recipe> {
  return new Promise<Recipe>((resolve, reject) => {
    fetch(`${BASE_URL}/${id}`)
      .then((response) => {
        if (response.ok) {
          resolve(response.json()); // sukses -> resolve
        } else {
          reject("Resep tidak ditemukan"); // gagal -> reject
        }
      })
      .catch(() => reject("Tidak bisa terhubung ke server"));
  });
}