import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator,ScrollView } from 'react-native'
import FoodFactItem from './FoodFactItem'
import { getFoodFromFoodFactWithSearchedText } from './TMDBFoodFact'
import {Card} from 'react-native-paper'

class FoodFactRecherche extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this.state = {
      foods: [],
      isLoading: false,
      count: 0
    }
  }

  _loadFoods() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFoodFromFoodFactWithSearchedText(this.searchedText, this.page+1).then(data => {
          
          this.page = data.page
          this.totalPages = data.page_size
          this.setState({
            foods:data.products,
            isLoading: false,
            count:data.count
          })
      })
    }
  }

  _searchTextInputChanged(text) {
    this._searchFoods()
    this.searchedText = text 
    

  }
  _displayDetail=(id)=>{
    this.props.navigation.navigate('Details',{id})
    
  }

  _searchFoods() {

    this.page = 0
    this.totalPages = 0
    this.setState({
      foods: [],count:0
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
    this.props.navigation.setOptions({
      headerRight: () => (
        <View></View>
      ),
    });
    
    
    return (
      <View style={styles.main_container}>
      <Card style={{}}>
        <TextInput
          style={styles.textinput}
          placeholder='Nom du produit'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFoods()}
        />
        <View style={{flexDirection:"row"}}>
        {this.state.count>0?<Text style={{fontSize:9}}>{this.state.count}</Text>:null}
        </View>
        </Card>

          

        
        <ScrollView>
        <FlatList style={{flex:0}}
          data={this.state.foods}
          keyExtractor={(item) => item._id}
          

          renderItem={({item}) => <FoodFactItem food={item} display={this._displayDetail}/> }
          onEndReachedThreshold={0.5}
          onEndReached={() => {}}
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
    backgroundColor:'#1b1e23',
  },
  textinput: {
    
    height: 35,
    borderWidth: 1,
    paddingLeft: 5,
    

  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default FoodFactRecherche