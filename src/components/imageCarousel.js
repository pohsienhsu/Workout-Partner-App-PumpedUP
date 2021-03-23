import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView, StyleSheet} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry, {styles, colors, slideDimensions} from './sliderEntry';
// import styles, { colors } from './styles/index.style';
// import { scrollInterpolators, animatedStyles } from './utils/animations';
// import { sliderWidth, itemWidth } from './styles/SliderEntry.style';
// import { ENTRIES1, ENTRIES2 } from './static/entries';
// const IS_ANDROID = Platform.OS === 'android';

const SLIDER_1_FIRST_ITEM = 1;


const DATA = [
  {
      title: 'Beautiful and dramatic Antelope Canyon',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://firebasestorage.googleapis.com/v0/b/pumpedup-97f58.appspot.com/o/pictures%2F5zM3ILa60TQb2c4Tuv3OywtP9rT2%2F1.jpeg?alt=media&token=794d62d0-4982-401b-ae6d-2f28e6c4bef6'
  },
  {
      title: 'Earlier this morning, NYC',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://firebasestorage.googleapis.com/v0/b/pumpedup-97f58.appspot.com/o/pictures%2F5zM3ILa60TQb2c4Tuv3OywtP9rT2%2F2.jpeg?alt=media&token=7492cf04-8e04-4452-af27-a014834d182f'
  },
  {
      title: 'White Pocket Sunset',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      illustration: 'https://firebasestorage.googleapis.com/v0/b/pumpedup-97f58.appspot.com/o/pictures%2F5zM3ILa60TQb2c4Tuv3OywtP9rT2%2F3.jpeg?alt=media&token=7218f584-19f9-425f-a096-cc8f02b44394'
  },
  {
      title: 'Acrocorinth, Greece',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      illustration: 'https://firebasestorage.googleapis.com/v0/b/pumpedup-97f58.appspot.com/o/pictures%2F5zM3ILa60TQb2c4Tuv3OywtP9rT2%2F1.jpeg?alt=media&token=794d62d0-4982-401b-ae6d-2f28e6c4bef6'
  },
  {
      title: 'The lone tree, majestic landscape of New Zealand',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://firebasestorage.googleapis.com/v0/b/pumpedup-97f58.appspot.com/o/pictures%2F5zM3ILa60TQb2c4Tuv3OywtP9rT2%2F2.jpeg?alt=media&token=7492cf04-8e04-4452-af27-a014834d182f'
  },
  {
      title: 'Middle Earth, Germany',
      subtitle: 'Lorem ipsum dolor sit amet',
      illustration: 'https://firebasestorage.googleapis.com/v0/b/pumpedup-97f58.appspot.com/o/pictures%2F5zM3ILa60TQb2c4Tuv3OywtP9rT2%2F3.jpeg?alt=media&token=7218f584-19f9-425f-a096-cc8f02b44394'
  }
];

export default class ImageCarousel extends Component {

    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            data: props.data
        };
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

    _renderLightItem ({item, index}) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderDarkItem ({item, index}) {
        return <SliderEntry data={item} even={true} />;
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
                  dotsLength={DATA.length}
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
        console.log(this.state.data);

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



