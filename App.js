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
  Icon
} from 'react-native';
import Video from 'react-native-video';
import LightVideo from './lights.mp4';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  state= {
    error: false
  };
  handleError= (meta) =>{
    const {error: {code}} = meta;
    let error = "An error Occured Playing this video";
    switch(code) {
      case -11800:
        error = "Could not load video from URL";
        break;
    }
    this.setState({ error });
  }
  render() {
    const { width } = Dimensions.get("window");
    const height = width * 0.5625;
    const { error } = this.state
    return (
      <View style={styles.container}>
        <View style={error ? styles.error : undefined}>
        <Video 
        source={{uri: "http://google.com/notavideo"}}
        resizeMode="contain"
        style={{ width: "100%", height }}
        onError={this.handleError}
        />
        <View style={styles.videoCover}> 
            { error && <Icon name="exclamation-triangle" size={30} color="red"/>}
            {error && <Text>{error}</Text>}
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
  error:{
    backgroundColor: "#000"
  },
});
