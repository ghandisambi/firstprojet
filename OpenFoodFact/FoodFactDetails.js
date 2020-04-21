// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import moment from 'moment'
import numeral from 'numeral'
import FoodFactItem from './FoodFactItem'
import { getFoodDetailFromFoodFact } from './TMDBFoodFact'

class FoodFactDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      food: undefined,
      isLoading: true
    }
  }
_nutriscore(char){
  
}
  componentDidMount() {
    getFoodDetailFromFoodFact(this.props.route.params.id).then(data => {
      this.setState({
        food: data.product,
        isLoading: false
      })
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

  _displayFilm() {
    const { food } = this.state
    if (food != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: food.image_url}}
          />
          <Text style={styles.title_text}>{food.product_name}</Text>
          <Text style={styles.vote_text}>Quantité: {food.product_quantity}</Text>
          <Text style={styles.default_text}>Date: {food.expiration_date}</Text> 
          

        <Text style={styles.description_text}>Ingredients: {food.ingredients_text}</Text>
          <Text style={styles.description_text}>
          nutriments ->
        salt_100g:({food.nutriments.salt_100g}),

sodium_value:({food.nutriments.sodium_value}),

proteins_100g:({food.nutriments.proteins_100g}),

salt:({food.nutriments.salt}),

energy_value:({food.nutriments.energy_value}),
fat:({food.nutriments.fat}),
energykcal_100g:({food.nutriments.energykcal_100g}),

carbohydrates:({food.nutriments.carbohydrates}),
saturatedfat:({food.nutriments.saturatedfat}),

energykcal_value:({food.nutriments.energykcal_value}),
carbohydrates_unit:({food.nutriments.carbohydrates_unit}),
carbohydrates_value:({food.nutriments.carbohydrates_value}),
fat_unit:({food.nutriments.fat_unit}),
fat_value:({food.nutriments.fat_value}),
sugars_unit:({food.nutriments.sugars_unit}),
sugars_value:({food.nutriments.sugars_value}),
carbohydrates_100g:({food.nutriments.carbohydrates_100g}),
saturatedfat_value:({food.nutriments.saturatedfat_value}),

proteins_unit:({food.nutriments.proteins_unit}),
proteins:({food.nutriments.proteins}),

salt_unit:({food.nutriments.salt_unit}),
saturatedfat_unit:({food.nutriments.saturatedfat_unit}),
fat_100g:({food.nutriments.fat_100g}),
energy_unit:({food.nutriments.energy_unit}),
sodium_unit:({food.nutriments.sodium_unit}),
saturatedfat_100g:({food.nutriments.saturatedfat_100g}),

sugars_100g:({food.nutriments.sugars_100g}),
proteins_value:({food.nutriments.proteins_value}),

salt_value:({food.nutriments.salt_value}),

sodium:({food.nutriments.sodium}),

energy_100g:({food.nutriments.energy_100g}),

energykcal_unit:({food.nutriments.energykcal_unit}),
sugars:({food.nutriments.sugars}),
sodium_100g:({food.nutriments.sodium_100g}),

energy:({food.nutriments.energy}),

energykcal:({food.nutriments.energykcal}),



          </Text>

          <Text style={styles.default_text}>Companie(s): {food.brands}
          </Text>
          <Text style={styles.default_text}>Magazins: {food.stores}
          </Text>
          <Text style={styles.default_text}>Appellation: {food.generic_name_fr}
          </Text>
          
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }

})

export default FoodFactDetail