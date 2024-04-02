import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../@types/routes";
import type { RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";

type RecipeItem = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  caloriesPerServing: number;
  tags: string[];
  image: string;
  rating: number;
};

export function Recipe() {
  const { params } = useRoute<RouteProp<RootStackParamList, "recipe">>();

  const [data, setData] = useState<RecipeItem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/recipes/${params.recipeId}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [params.recipeId]);

  if (!data) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Image
          style={styles.image}
          source={{
            uri: data.image,
          }}
        />
        <View style={styles.title}>
          <Text style={styles.headerText}>{data.name}</Text>
          <Text style={styles.headerRating}>{data.rating}</Text>
        </View>
        <View style={styles.text}>
          <Text style={styles.time}>
            {data.cookTimeMinutes + data.prepTimeMinutes} minutes
          </Text>
          <Text style={styles.cal}>{data.caloriesPerServing} cal</Text>
        </View>
      </View>

      <View style={styles.island}>
        <View
          style={{
            marginBottom: 12,
            flexDirection: "row",
            gap: 10,
            alignItems: "center"
          }}
        >
          <Text
            style={styles.headerText}
          >
            Ingredients
          </Text>
          <View
            style={{
              paddingVertical: 2,
              paddingHorizontal: 8,
              backgroundColor: "#c3c3c3",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>{data.ingredients.length}</Text>
          </View>
        </View>
        {data.ingredients.map((ingredient, index) => (
          <Text
            style={{
              fontSize: 18,
              marginBottom: 8,
            }}
            key={index}
          >
            - {ingredient}
          </Text>
        ))}
      </View>

      <View style={styles.island}>
        <View
          style={{
            marginBottom: 12,
            flexDirection: "row",
            gap: 10,
            alignItems: "center"
          }}
        >
          <Text
            style={styles.headerText}
          >
            Instructions
          </Text>
          <View
            style={{
              paddingVertical: 2,
              paddingHorizontal: 8,
              backgroundColor: "#c3c3c3",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>{data.instructions.length}</Text>
          </View>
        </View>
        {data.instructions.map((instruction, index) => (
          <Text
            style={{
              fontSize: 18,
              marginBottom: 16,
            }}
            key={index}
          >
            {index + 1}. {instruction}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  heading: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
  },
  headerText: {
    fontSize: 24,
    color: "#000",
    fontWeight: "500",
  },
  headerRating: {
    fontSize: 20,
    color: "#000000c3",
    fontWeight: "400",
  },
  title: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },
  time: {
    fontSize: 14,
    color: "#000",
  },
  cal: {
    fontSize: 14,
    color: "#000",
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
  },
  island: {
    backgroundColor: "#fff",
    marginTop: 20,
    width: "100%",
    borderRadius: 24,
    padding: 20,
  },
});
