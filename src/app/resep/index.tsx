import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { styles } from "../../constants/styles";
import { getRecipes } from "../../services/recipeService";
import { Recipe } from "../../types/recipe";

const keywords = ["soup", "noodle", "chicken"];

export default function ResepList() {
  const router = useRouter();

  const [keyword, setKeyword] = useState("soup");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  // useEffect: ambil data dari API tiap keyword berubah / tombol "Coba Lagi"
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getRecipes(keyword); // await: tunggu Promise selesai
        setRecipes(data);
      } catch {
        setError("Gagal memuat resep. Periksa koneksi internet.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [keyword, reloadKey]);

  return (
    <View style={styles.detailContainer}>
      <View style={styles.filterRow}>
        {keywords.map((k) => (
          <Pressable
            key={k}
            onPress={() => setKeyword(k)}
            style={[styles.chip, keyword === k && styles.chipActive]}
          >
            <Text
              style={[styles.chipText, keyword === k && styles.chipTextActive]}
            >
              {k}
            </Text>
          </Pressable>
        ))}
      </View>

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => setReloadKey(reloadKey + 1)} />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            <Text style={styles.type}>Resep tidak ditemukan.</Text>
          }
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push(`/resep/${item.id}`)}
            >
              <Image source={{ uri: item.image }} style={styles.recipeImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.type}>
                  {item.cuisine} • {item.cookTimeMinutes} menit • ⭐ {item.rating}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}