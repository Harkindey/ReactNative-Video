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
  
  render() {
    return (
      <View style={styles.container}>
          <Video
          repeat 
          source={LightVideo}
          resizeMode="cover"
          style={StyleMedia.absoluteFill}
          onLoadStart={this.handleLoadStart}
          />
          <View>
              <Text style={styles.header}>Log In</Text>
              <TextInput
                placeholder="Email"
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.input}
              />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 30,
    backgroundColor: "transparent",
    color: '#FFF'
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: '#FFF',
    marginVertical: 15,
    paddingLeft: 15,
  }
});
