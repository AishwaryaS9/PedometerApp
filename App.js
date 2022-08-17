import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Pedometer } from 'expo-sensors'
import CircularProgress from 'react-native-circular-progress-indicator';

export default function App() {
  const [PedometerAvailability, setPedometerAvailability] = useState("");
  const [StepCount, SetStepCount] = useState(0);

  // var WindowHeight = Dimensions.get("window").height;

var Dist = StepCount /1300;
var DistanceCovered = Dist.toFixed(4);

var cal = DistanceCovered * 60;
var caloriesBurnt = cal.toFixed(4);

  React.useEffect(() => {
    subscribe();

  }, []);

const subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      SetStepCount(result.steps);
    });


    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result));
      },
      (error) => {
        setPedometerAvailability(error);
      }
    );
  };


  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode='cover'
        source={require('./assets/runningFinal.jpg')}
        // resizeMode="cover"
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headingDesign}>
            Is Pedometer available on the device : {PedometerAvailability}
          </Text>
          </View>
          <View style={{ flex: 3, paddingRight: 15}}>
            <CircularProgress
              value={StepCount}
              maxValue={6500}
              radius={180}
              textColor={'#051f38'}
              activeStrokeColor={'#B55973'}
              inActiveStrokeColor={'#59B59B'}
              inActiveStrokeOpacity={0.5}
              inActiveStrokeWidth={40}
              activeStrokeWidth={40}
              title={"Step Count"}
              titleColor={'#B55973'}
              titleStyle={{ fontWeight: "bold" }}
            />
          </View>


          <View style={{ flex: 1 , justifyContent: "center"}}>
            <View style={{ flex: 1 }}>
              <Text 
              style={[styles.textDesign,
               { paddingLeft: 25, marginLeft: "20%" },
               ]}>
                Target : 6500 steps(5kms)
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.textDesign, 
              {width: '93%',paddingLeft: 25, marginLeft: "-3.5%" },
              ]}>
                Distance Covered : {DistanceCovered} km
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.textDesign, 
              { paddingLeft: 25, marginLeft: "25%" },
              ]}>
                Calories Burnt : {caloriesBurnt} 
              </Text>
            </View>

          </View>

      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',


  },
  headingDesign: {
    color: "#092c4a",
    backgroundColor: 'rgba(131,224,249,0.5)',
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: "Papyrus",
    
  },

  textDesign: {
    backgroundColor: 'rgba(131,224,249,0.5)',
    height: 50,
    width: "85%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    fontSize: 20,
    color: "#072742",
    fontWeight: "bold",
    // fontFamily: "Papyrus"
  },

});
