import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#B91C1C",
    marginTop: 6,
  },
  tagline: {
    fontSize: 14,
    color: "#7C2D12",
    marginTop: 2,
  },
  summary: {
    fontSize: 13,
    color: "#431407",
    textAlign: "center",
    marginTop: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
  },
  cardInfo: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#431407",
  },
  type: {
    fontSize: 12,
    color: "#9A3412",
    marginTop: 2,
  },
  button: {
    backgroundColor: "#EA580C",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginLeft: 4,
  },
});