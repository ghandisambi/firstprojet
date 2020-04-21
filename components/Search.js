// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator,ScrollView,Dimensions } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText,getImageFromApi } from '../API/TMDBApi'
import {Card} from 'react-native-paper'
import Navigation from './Navigation'
import {ParallaxBackground,HorizontalWrapper} from 'react-native-parallax-background'
const {height, width} = Dimensions.get('window')


class Search extends React.Component {

   
    
  
  constructor(props) {
    super(props)
    

    this.searchedText = ""
    this.page = 0
    this.totalPages = 0
    this.state = {
      films: [],
      isLoading: false,
      count: 0
    }
    
  }
 

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            films: [ ...this.state.films, ...data.results ],
            isLoading: false,
            count:data.total_results
          })
      })
    }
    else{
      this._init()
    }
    
    
    
  }


  _searchTextInputChanged(text) {
    this.searchedText = text

    this._searchFilms()
  }


  _searchFilms() {

    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],count:0
    }, () => { if(this.searchedText.length > 0){
        this._loadFilms()}else{
      this._init()
    }
    })
  }
  _init(){
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],count:0
    })
  }
 _displayDetail=(id)=>{
    this.props.navigation.navigate('Details',{id})
    
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
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        
        <View style={{flexDirection:"row"}}>
        {this.state.count>0?<Text style={{fontSize:9}}>{this.state.count}</Text>:null}
        </View>
        </Card>
        
        <ScrollView>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}

          renderItem={({item}) => <FilmItem film={item} display={this._displayDetail} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {

              if (this.page < this.totalPages) {
                 if(this.state.count>=100){if(this.page<=5){this._loadFilms()}}
                 else if(this.state.count>40) {if(this.page<=3){this._loadFilms()}}
                 else{this._loadFilms}
              }
              


          }}
        />
        { this.state.isLoading ?
          <View style={styles.loading_containe}>
            <ActivityIndicator size='large' />
          </View>
          : null
      }
      
          <View>
              
          </View>  
       
        </ScrollView>


        
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor:'#1b1e23'
    
  },
  textinput: {
    
    height: 35,
    borderWidth: 1,
    

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

export default Search