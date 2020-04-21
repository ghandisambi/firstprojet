import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './Search';
import Recherche from './Recherche';
import FoodFactRecherche from '../OpenFoodFact/FoodFactRecherche';
import FoodFactDetail from '../OpenFoodFact/FoodFactDetails'
import FilmDetail from './FilmDetails'


function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}


function HomeScreen({ navigation }) {
  const [count, setCount] = React.useState(0);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      ),
    });
  }, [navigation, setCount]);
  return (
    <View style={{ flex: 1,backgroundColor: '#1b1e23', }}>
    <Search />
       
      <Text>Home screen click: {count}</Text>
      <Button
        title="Voir Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
function FoodFact ({navigation}){

  const [count, setCount] = React.useState(0);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      ),
    });
  }, [navigation, setCount]);
return (
  <View style={{flex:1,backgroundColor:'#1b1e23',}}>
   <Text>FoodFact screen</Text>
  <Button
        title="Voir Details"
        onPress={() => navigation.navigate('Details')}
      /><Text>Count: {count}</Text>
  </View>
)
}
function SettingsScreen({ navigation }) {
  const [count, setCount] = React.useState(0);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      ),
    });
  }, [navigation, setCount]);
  return (
    <View style={{ flex: 1,backgroundColor: '#1b1e23', }}>
      <Recherche/>
      <Text>Food screen click:{count}</Text>
      <Button
        title="Voir Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Film" component={Search} />
      <HomeStack.Screen name="Details" component={FilmDetail} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Food" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}
const FoodFactStact= createStackNavigator();
function FoodFactStackScreen(){
 return(
   <SettingsStack.Navigator>
      <SettingsStack.Screen name="FoodFact" component={FoodFactRecherche} />
      <SettingsStack.Screen name="Details" component={FoodFactDetail} />
    </SettingsStack.Navigator>
 )

}

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Film" component={HomeStackScreen} />
        <Tab.Screen name="Food" component={SettingsStackScreen} />
        <Tab.Screen name="FoodFact" component={FoodFactStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}