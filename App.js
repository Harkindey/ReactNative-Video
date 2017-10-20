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
  ScrollView
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

const TRESHOLD = 100;

export default class App extends Component<{}> {
  state = {
    paused: true
  };

  position ={
    start:null,
    end:null
  };
  
  handleVideoLayout = (e) =>{
    const {height} = Dimensions.get("Window");
    this.position.start = e.nativeEvent.layout.y - height + TRESHOLD;
    this.position.end = e.nativeEvent.layout.y + e.nativeEvent.layout.height - TRESHOLD;
  }
  handleScroll= (e) => {
    const scrollPositon = e.nativeEvent.contentOffset.y;
    const paused =  this.state.paused;
    const{ start, end } = this.position;

    if (scrollPositon > start && scrollPositon < end && paused){
      this.setState({ paused: false });
    } else if ((scrollPositon > end || scrollPositon < start && !paused)){
      this.setState({ paused: true })
    }
  }
  
  
  render() {
    const {width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
      <ScrollView scrollEventThrottle={16} onScroll>
      {this.handleScroll}
              <View style={styles.fakeCOntent}>
                  <Text>
                    {this.state.paused ? "Paused" : "Playing"}
                  </Text> 
              </View> 
              <Video
              repeat 
              source={LightVideo}
              paused={this.state.paused}
              style={{ width, height: 300}}
              onLayout={this.handleVideoLayout}
              />
                  <View style={styles.fakeCOntent}>
                              <Text>
                                {this.state.paused ? "Paused" : "Playing"}
                              </Text> 
                  </View> 
        </ScrollView>  
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fakeContent : {
    height: 850,
    backgroundColor: "#CCC",
    paddingTop: 250,
    alignItems: "center",
  },
});
