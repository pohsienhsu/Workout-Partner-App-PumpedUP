import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
// import styles from '../styles/SliderEntry.style';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { url }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: url }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: url }}
              style={styles.image}
            />
        );
    }

    render () {
        // const { data: { title, subtitle }, even } = this.props;
        const { even } = this.props;

        // const uppercaseTitle = title ? (
        //     <Text
        //       style={[styles.title, even ? styles.titleEven : {}]}
        //       numberOfLines={2}
        //     >
        //         { title.toUpperCase() }
        //     </Text>
        // ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
            //   onPress={() => { alert(`You've clicked '${title}'`); }}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    {/* <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} /> */}
                </View>
                {/* <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                </View> */}
            </TouchableOpacity>
        );
    }
}

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    yellow: "#EF9C2E",
    background1: '#B721FF',
    background2: '#21D4FD'
  }

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const wp = (percentage) => {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

export const slideDimensions = {
    slideHeight: viewportHeight * 0.36,
    slideWidth: wp(75),
    itemHorizontalMargin: wp(2),
    sliderWidth: viewportWidth,
    itemWidth: wp(75) + wp(2) * 2,
    entryBorderRadius:8
}


export const styles = StyleSheet.create({
    slideInnerContainer: {
        width: slideDimensions.itemWidth,
        height: slideDimensions.slideHeight,
        paddingHorizontal: slideDimensions.itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: slideDimensions.itemHorizontalMargin,
        right: slideDimensions.itemHorizontalMargin,
        bottom: 18,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: slideDimensions.entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: 0, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: slideDimensions.entryBorderRadius,
        borderTopRightRadius: slideDimensions.entryBorderRadius
    },
    // marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    imageContainerEven: {
        backgroundColor: colors.black
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: slideDimensions.entryBorderRadius,
        borderTopLeftRadius: slideDimensions.entryBorderRadius,
        borderTopRightRadius: slideDimensions.entryBorderRadius
    },
    // borderRadius: IS_IOS ? entryBorderRadius : 0,
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: slideDimensions.entryBorderRadius,
        backgroundColor: 'white'
    },
    radiusMaskEven: {
        backgroundColor: colors.black
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 20 - slideDimensions.entryBorderRadius,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderBottomLeftRadius: slideDimensions.entryBorderRadius,
        borderBottomRightRadius: slideDimensions.entryBorderRadius
    },
    textContainerEven: {
        backgroundColor: colors.black
    },
    title: {
        color: colors.black,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },
    subtitle: {
        marginTop: 6,
        color: colors.gray,
        fontSize: 12,
        fontStyle: 'italic'
    },
    subtitleEven: {
        color: 'rgba(255, 255, 255, 0.7)'
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.black
    },
    container: {
        flex: 1,
        backgroundColor: colors.yellow
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        paddingVertical: 10
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    paginationContainer: {
        paddingVertical: 4
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
});