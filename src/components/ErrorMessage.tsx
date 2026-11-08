import { Pressable, Text, View } from "react-native";
import { styles } from "../constants/styles";

interface Props {
  message: string;
  onRetry?: () => void; // opsional
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <View style={styles.centerBox}>
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && (
        <Pressable style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Coba Lagi</Text>
        </Pressable>
      )}
    </View>
  );
}