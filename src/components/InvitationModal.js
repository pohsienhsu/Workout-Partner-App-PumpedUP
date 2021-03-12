import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import { Icon } from 'react-native-elements'

const { width } = Dimensions.get('window');

const data = [
  {
    name: 'Conan O\'Brien',
    intro: 'If you can really laugh at yourself loud and hard every time you fail,\nPeople will think you\' drunk',
    img: 'https://tvline.com/wp-content/uploads/2020/11/conan-ending.jpg?',
    gender: 'Male',
    age: 57,
    weight: '190',
    hobby: 'Self pity'
  },
  {
    name: 'Kevin Hart',
    intro: 'Tallest and Fastest Man on Earth\nNever mess with me!',
    img: 'https://www.blackenterprise.com/wp-content/blogs.dir/1/files/2020/05/Kevin-Hart-Headshot-Kevin-Kwan-High-Res--scaled-e1589926838234.jpg',
    gender: 'Male',
    age: 40,
    weight: '150',
    hobby: 'Cat, Movies, Thug Life'
  },
  {
    name: 'Gordon Ramsay',
    intro: 'This lamb is so undercooked, it\'s following Mary to school!',
    img: 'https://www.telegraph.co.uk/content/dam/news/2016/09/29/6455882-ramsay-news_trans_NvBQzQNjv4BqbRF8GMdXQ5UNQkWBrq_MOBxo7k3IcFzOpcVpLpEd-fY.jpg',
    gender: 'Male',
    age: 54,
    weight: '200',
    hobby: 'Cook, Make adults cry'
  }
];


const  InvitationModal = ({modalVisible, navigation}) => {
  const carouselRef = useRef(null);

  const renderItem = ({ item, index }) => {
    const { name, intro, img, gender, age, weight, hobby } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          this.numberCarousel.scrollToIndex(index);
        }}
      >
        <ImageBackground
          source={{ uri: img }}
          style={styles.imageBackground}
        >
        </ImageBackground>
        <View style={styles.lowerContainer}>
          <Text style={styles.titleText}>{name}</Text>
          <Text style={styles.contentText}>{intro}</Text>
          <Text style={styles.contentText}>{gender}, {age}yrs, {weight}lb</Text>
          <Text style={styles.contentText}>Hobby: {hobby}</Text>

          <View style={styles.iconBox}>
              <View style={styles.IconBoxCheck}>
                <TouchableOpacity 
                  style={styles.IconButton}
                  onPress={() => navigation.navigate("PairUp")}
                >
                  <Icon name='check' color='green'/>
                </TouchableOpacity>
              </View>

              <View style={{ paddingLeft: 40}}/>

              <View style={styles.IconBoxClose}>
                <TouchableOpacity style={styles.IconButton}>
                  <Icon name='close' color='red'/>
                </TouchableOpacity>
              </View>
            </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Carousel
      style={{
        alignSelf: 'center',
        flex: 1,
        backgroundColor: 'transparent', 
        display: modalVisible}}
      initialIndex={1}
      data={data}
      renderItem={renderItem}
      itemWidth={0.7 * width}
      inActiveOpacity={0.3}
      containerWidth={0.8 * width}
      ref={carouselRef}
    />
  );
}

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    backgroundColor: 'white'
  },
  item: {
    borderWidth: 2,
    backgroundColor: '#EF9C2E',
    flex: 1,
    borderRadius: 5,
    borderColor: 'white',
    elevation: 3
  },
  imageBackground: {
    flex: 2,
    backgroundColor: '#EF9C2E',
    borderWidth: 5,
    borderColor: '#EF9C2E'
  },
  titleText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
  contentText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize:12,
  },
  iconBox: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop: 15
  },
  IconBoxCheck: {
    width: 34,
    height: 34,
    backgroundColor: 'green',
    borderRadius: 150,    
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconBoxClose: {
    width: 34,
    height: 34,
    backgroundColor: 'red',
    borderRadius: 150,    
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconButton: {
    width: 30,
    height: 30,
    backgroundColor: '#EF9C2E',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InvitationModal;