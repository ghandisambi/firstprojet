import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator,ScrollView } from 'react-native'
import FoodItem from './FoodItem'
import { getFoodFromApiWithSearchedText } from '../API/FoodApi'
import food from '../Helpers/fooData.jsx'
import {Card} from 'react-native-paper'


class Rechercher extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page=0;
    this.state = {
      hits:[],
      isLoading: false,
      count: 0
    }
  }

  _loadFoods() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFoodFromApiWithSearchedText(this.searchedText).then(data => {console.log(data)
          this.setState({
            hits:  data.hits,
            isLoading: false,
            count:data.total_hits
          })
      })
    }
    
  }

  _searchTextInputChanged(text) {
    this.searchedText = text 
    this._searchFoods()
  }

  _searchFoods() {
    
    this.setState({
      hits: [],count:0
    }, () => {
        this._loadFoods()
    })
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
      <Card style={{padding:5}}>

        <TextInput
          style={styles.textinput}
          placeholder='Food name'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFoods()}
        />
        <Button title='Rechercher' onPress={() => this._searchFoods()}/>
        <View style={{flexDirection:"row"}}>
        </View>
        </Card>

          

        
        <ScrollView>
        <FlatList
          data={this.state.hits}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => <FoodItem food={item}/>}
        />
        { this.state.isLoading ?
          <View style={styles.loading_containe}>
            <ActivityIndicator size='large' />
          </View>
          : null
      }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 40,
    borderWidth: 2,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    
  }
})

export default Rechercher