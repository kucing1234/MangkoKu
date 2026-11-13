import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { styles } from "../../constants/styles";
import { getRecipeById } from "../../services/recipeService";
import { Recipe } from "../../types/recipe";

export default function ResepDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect + .then() / .catch() / .finally()
  useEffect(() => {
    getRecipeById(Number(id))
      .then((data) => setRecipe(data)) // resolve -> masuk sini
      .catch((message) => setError(String(message))) // reject -> masuk sini
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <View style={styles.detailContainer}>
      {loading ? (
        <Loading />
      ) : error || !recipe ? (
        <ErrorMessage message={error || "Data kosong"} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={{ uri: recipe.image }} style={styles.detailImage} />
          <Text style={styles.detailName}>{recipe.name}</Text>
          <Text style={styles.type}>
            {recipe.cuisine} • {recipe.difficulty} • {recipe.cookTimeMinutes} menit
          </Text>

          <Text style={styles.sectionTitle}>Bahan</Text>
          {recipe.ingredients.map((bahan, i) => (
            <Text key={i} style={styles.bodyText}>
              • {bahan}
            </Text>
          ))}

          <Text style={styles.sectionTitle}>Langkah</Text>
          {recipe.instructions.map((langkah, i) => (
            <Text key={i} style={styles.bodyText}>
              {i + 1}. {langkah}
            </Text>
          ))}
        </ScrollView>
      )}

      <Pressable
        style={[styles.bigButton, { backgroundColor: "#6B7280" }]}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Kembali</Text>
      </Pressable>
    </View>
  );
}