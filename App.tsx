
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RecipesList } from './components/RecipesList';
import { TagList } from './components/TagList';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Home } from './pages/Home';
import { Recipe } from './pages/Recipe';
import { RootStackParamList } from './@types/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="categories" component={CategoriesScreen} options={{headerShown: false}} />
        <Stack.Screen  name="recipe" component={Recipe} options={{title: 'Detail Recipe', headerBackTitle: 'Home' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CategoriesScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Categories Screen</Text>
    </View>
  );
}

function RecipeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Recipe Screen</Text>
    </View>
  );
}
