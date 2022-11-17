//import liraries
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, SafeAreaView, Platform, PermissionsAndroid, FlatList, Dimensions } from 'react-native';

import DeepARView, {
  CameraPositions,
} from 'react-native-deepar';
import {key} from './key.json'

const App = ({ navigation, route }) => {

  const deepARRef = useRef(null);

  const [hasCameraPermission, sethasCameraPermission] = useState(null)
  const [cameraType, setCameraType] = useState(false)

  useEffect(() => {
    deepARRef?.current?.switchEffect({
      mask: 'lion',
      slot: 'mask',
    });
  }, [])

  useEffect(() => {
    newFunction()

    async function newFunction() {

      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]
      )
      // console.log(granted);
      granted == 'granted' ? sethasCameraPermission(true) : sethasCameraPermission(false)
    }

  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000', justifyContent: 'center', paddingBottom: 20 }}>
        <DeepARView
          ref={deepARRef}
        apiKey="API-KEY"
          style={{ flex:1 }}
          position={cameraType == true ? CameraPositions.FRONT : CameraPositions.BACK}
          onInitialized={() => {
            // ..
          }}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideButtons: {
    // backgroundColor:'#000000',
    // borderWidth:1,
    borderColor: 'yellow',
    paddingVertical: 5,
    // marginTop:-20,
    // height:'40%',
    // width:50,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 10

  },
  bottomControls: {
    // borderWidth:1,
    borderColor: 'yellow',
    backgroundColor: 'black',
    // flex:0.1,
    width: '100%',
    height: '15%',
    // flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? 15 : 0
  },
  outerCircle: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  innerCircle: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#FFFFFF'
  },
  innerSquare: {
    height: 30,
    width: 30,
    // borderRadius: 35 / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 5
  }
})

export default App;


