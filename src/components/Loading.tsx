import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "../constants/styles";

export default function Loading() {
  return (
    <View style={styles.centerBox}>
      <ActivityIndicator size="large" color="#EA580C" />
      <Text style={styles.type}>Sedang mengambil data...</Text>
    </View>
  );
}