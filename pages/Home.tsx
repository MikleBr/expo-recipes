import { SafeAreaView } from "react-native-safe-area-context";
import { TagList } from "../components/TagList";
import { RecipesList } from "../components/RecipesList";
import { ScrollView, StyleSheet, Text } from "react-native";

export function Home(){
    return <SafeAreaView style={styles.container}>
    <ScrollView>
        <TagList />
        <Text style={{
          fontSize: 18, 
          fontWeight: "500",
          textAlign: "left",
          marginLeft: 20,
          marginTop: 10,
          marginBottom: 20,
        }}>
            Recipes For You
        </Text>
        <RecipesList />
    </ScrollView>
  </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
  });
