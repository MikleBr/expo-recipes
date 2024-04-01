import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

export function TagList() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/recipes/tags")
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => setData(json), 0);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <FlatList
    style={styles.container}
      data={['All', ...data]}
      horizontal={true}
      renderItem={({ item, index }) => (
        <View style={kostylStyles(index, item === 'All')}>
          <Text style={styles.tagText}>{item}</Text>
        </View>
      )}
      keyExtractor={(item) => item}
    />
  );
}

const kostylStyles = (index: number, isSelected: boolean) => {
  if (index === 0) {
    styles.tag.marginLeft = 20
  }
  if (isSelected) {
    styles.tag.backgroundColor = '#000'
  }
  return styles.tag;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  tag: {
    marginRight: 10,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderBlockColor: "#000",
    borderWidth: 1,
  },
  tagText: {
    paddingVertical: 8,
    paddingBottom: 12,
    fontSize: 14,
    color: "#000",
  },
});
