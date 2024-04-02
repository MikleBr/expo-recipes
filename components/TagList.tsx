import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, Image, StyleSheet, Text, View } from "react-native";

export function TagList() {
  const navigation = useNavigation();

  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/recipes/tags")
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => setData(json.slice(0, 4)), 1000);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.showAllButton} onPress={() => navigation.navigate('categories')}>Show All</Text>
      </View>
      <FlatList
        style={styles.list}
        data={["All", ...data]}
        horizontal={true}
        renderItem={({ item, index }) => (
          <View
            style={StyleSheet.flatten([
              styles.tag,
              index === 0 && { marginLeft: 20 },
              item === "All" && { backgroundColor: "#000" },
            ])}
          >
            <Text
              style={StyleSheet.flatten([
                styles.tagText,
                item === "All" && { color: "#fff" },
              ])}
            >
              {item}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    width: "100%",
  },
  list: {
    marginTop: 20,
    width: "100%",
  },
  tag: {
    marginRight: 10,
    borderRadius: 50,
    borderBlockColor: "#000",
    borderWidth: 1,
  },
  tagText: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#000",
  },
  heading: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18, 
    fontWeight: "500",
  },
  showAllButton: {
    color: 'gray'
  }
});
