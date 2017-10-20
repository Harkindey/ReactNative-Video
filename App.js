/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated
} from 'react-native';
import Video from 'react-native-video';
import LightVideo from './lights.mp4';
import Icon from 'react-native-vector-icons/FontAwesome';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  state = {
    buffering: true,
    animated: new Animated.Value(0)
  }

  handleLoadStart= () => {
    this.triggerBufferAnimation();
  }
  triggerBufferAnimation = () => {
    this.loopingAnimation = ANimated.loop(
      animated.timing(this.state.animated,{
        toValue: 1,
        duration: 350,
      })
    ).start();
  }

  handleBuffer = (meta) => {
    meta.isBuffering && this.triggerBufferingAnimation();

    if(this.loopingAnimation && !meta.isBuffering){
      this.loopiungAnimation.stopANimation();
    }

    this.State({
      buffering: meta.isBuffering
    })
  }
  render() {
    const {buffering} = this.state
    const { width } = Dimensions.get("window");
    const height = width * 0.5625;
    const { error } = this.state
    const interpolatedAnimation = this.state.animated.interpolate({
      inputRange: [0,1],
      outputRange: ["0deg", "360deg"]
    }) 

    const rotateStyle = {
      transform: [
        {rotate: interpolatedAnimation}
      ]
    }

    return (
      <View style={styles.container}>
        <View style={buffering ? styles.buffering : undefined}>
          <Video
          repeat 
          source={{uri: "http://player.vimeo.com/external/206340985.hd.mp4?s=0b055000e30067f11d3e2537bceb7157b47475bc&profile_id=119&oauth2_token_id=57447761"}}
          resizeMode="contain"
          style={{ width: "100%", height }}
          onLoadStart={this.handleLoadStart}
          onBuffer={this.handleBuffer}
          />
          <View style={styles.videoCover}> 
              {buffering && <Animated.View style={rotateStyle}><Icon name="circle-o-notch" size={30} color="#FFF"/></Animated.View>}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 250
  },
  videoCover: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255, .9)",
  },
  buffering:{
    backgroundColor: "#000"
  },
});
