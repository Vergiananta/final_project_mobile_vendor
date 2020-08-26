import React from 'react';
import bgSrc from "./SPASHSCREEN.gif";
import { ImageBackground, StyleSheet } from 'react-native';


const SplashScreen = props => {

    setTimeout(() => {
        props.navigation.navigate('Welcome')
    }, 2500)

    return (
        <ImageBackground style={styles.picture} source={bgSrc} >
        </ImageBackground>
    )
}
export default SplashScreen;

const styles = StyleSheet.create({
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    }
})