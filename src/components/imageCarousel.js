import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView, StyleSheet} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry, {styles, colors, slideDimensions} from './sliderEntry';

// const IS_ANDROID = Platform.OS === 'android';

const SLIDER_1_FIRST_ITEM = 1;

export default class ImageCarousel extends Component {

    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            data: props.data
        };
    }

    /**
     * The Rock Alternative Image
     * 1.
     * https://firebasestorage.googleapis.com/v0/b/pumpedup-97f58.appspot.com/o/pictures%2F5zM3ILa60TQb2c4Tuv3OywtP9rT2%2F3.jpeg?alt=media&token=6753a791-a48c-421a-999b-1609c79f884b
     * 2.
     * https://www.bosshunting.com.au/wp-content/uploads/2020/03/rock-workout-2.jpg
     */

    updatePic(prevData, nextData) {
      for (let i=0; i<prevData.length; i++) {
        if (prevData[i].url != nextData[i].url) return true;
      }
      return false;
    }

    componentDidUpdate(prevProps, prevState) {
      console.log('[imageCarousel.js] componentDidUpdate');
      // console.log(prevProps);
      // console.log(this.props);
      let picChanged = this.updatePic(prevProps.data, this.props.data);
      console.log(picChanged);
      if (this.props.data == null || this.props.data.length != prevState.data.length || picChanged) {
        this.setState({...prevState, data: this.props.data});
      }
    }

    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

    dataLength = (data) => {
        if (!data) return 0;
        else return data.length;
    }

    mainExample (number, title) {
        const { slider1ActiveSlide } = this.state;

        return (
            <View style={styles.exampleContainer}>
                {/* <Text style={styles.title}>{`Example ${number}`}</Text>
                <Text style={styles.subtitle}>{title}</Text> */}
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={this.state.data}
                  renderItem={this._renderItemWithParallax}
                  sliderWidth={slideDimensions.sliderWidth}
                  itemWidth={slideDimensions.itemWidth}
                  hasParallaxImages={true}
                  firstItem={SLIDER_1_FIRST_ITEM}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  // inactiveSlideShift={20}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={true}
                  loopClonesPerSide={2}
                  autoplay={false}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                  layout={"default"}
                />
                <Pagination
                  dotsLength={this.dataLength(this.state.data)}
                  activeDotIndex={slider1ActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={colors.black}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={this._slider1Ref}
                  tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }

    render () {
        const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
        // console.log(this.state.data);

        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    { this.gradient }
                    <ScrollView
                      style={styles.scrollview}
                      scrollEventThrottle={200}
                      directionalLockEnabled={true}
                    >
                        { example1 }
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}



