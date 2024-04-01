
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RecipesList } from './components/RecipesList';
import { TagList } from './components/TagList';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TagList />
      <Text style={{
        fontSize: 18, 
        fontWeight: "500",
        textAlign: "left",
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 20,
      }}>Recipes For You</Text>
      <RecipesList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
