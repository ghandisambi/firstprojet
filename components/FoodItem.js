import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getImageFromApi } from '../API/FoodApi'
import {Card} from 'react-native-paper'
import {getImage} from '../API/FoodApi'

class FoodItem extends React.Component {
  render() {
    const food = this.props.food
    return (
      <Card style={styles.card}>
      <View style={styles.main_container}>
        <Image
  style={styles.image}
  source={{uri: getImage()}}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{food.fields.item_name}</Text>
            <Text style={styles.vote_text}>{food.fields.nf_serving_size_qty}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>enseigne:{food.fields.brand_name}</Text>
            
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Prix:{food._score}</Text>
          </View>

        </View>
        
      </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  card:{margin:2,},

  main_container: {
    height: 130,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 120,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },

  
  date_container: {
    
    
  },
  date_text: {
    
    textAlign: 'right',
    fontSize: 14,
  }
})

export default FoodItem