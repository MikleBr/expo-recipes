import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

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

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Row recipes={item} />}
      keyExtractor={(item, index) => String(index)}
    />
  );
}

type CardProps = { recipe: RecipesItem };

const Card = ({ recipe }: CardProps) => {
  return (
    <View style={cardStyles.card}>
      <Image
        style={cardStyles.image}
        source={{
          uri: recipe.image,
        }}
      />
      <Text style={cardStyles.title}>{recipe.name}</Text>
    </View>
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
    fontWeight: '500'
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
