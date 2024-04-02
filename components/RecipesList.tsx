import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TouchableScale from "react-native-touchable-scale";
import { RootStackParamList } from "../@types/routes";

type RecipesItem = {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  difficulty: "Easy" | "Hard" | "Medium";
  prepTimeMinutes: number;
  cookTimeMinutes: number;
};

type StateType = [RecipesItem, RecipesItem][];

const formatData = (data: RecipesItem[]): [RecipesItem, RecipesItem][] => {
  return data.reduce((acc, item, index) => {
    if (index % 2 === 0) {
      acc.push([item, data[index + 1]]);
    }
    return acc;
  }, [] as [RecipesItem, RecipesItem][]);
};

export function RecipesList() {
  const [data, setData] = useState<StateType>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/recipes")
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => setData(formatData(json?.recipes || [])), 0);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data.map((group) => (
        <Row recipes={group} />
      ))}
    </View>
  );
}

type CardProps = { recipe: RecipesItem };

const Card = ({ recipe }: CardProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableScale
      activeScale={0.95}
      defaultScale={1}
      style={cardStyles.card}
      onPress={() => navigation.navigate("recipe", { recipeId: String(recipe.id) })}
    >
      <Image
        style={cardStyles.image}
        source={{
          uri: recipe.image,
        }}
      />
      <Text style={cardStyles.title}>{recipe.name}</Text>
    </TouchableScale>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    flex: 0.5,
    overflow: "hidden",
  },
  image: {
    borderRadius: 12,
    width: "100%",
    aspectRatio: 0.8,
    objectFit: "cover",
  },
  title: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
  },
});

type RowProps = { recipes: [RecipesItem, RecipesItem] };

const Row = ({ recipes }: RowProps) => (
  <View style={styles.row}>
    <Card recipe={recipes[0]} />
    <Card recipe={recipes[1]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  row: {
    paddingHorizontal: 20,
    width: "100%",
    padding: 0,
    marginBottom: 16,
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
