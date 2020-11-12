
import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class ScanScreen extends React.Component {
  constructor(){
    super()
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal'
    }
  }
  getCameraPermissions=async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
    this.setState({
    
      hasCameraPermissions: status === "granted",
     
      scanned: false
    });
  }
  handleBarCodeScanned=async({type,data})=>{
    const {buttonState} = this.state.buttonState
    if(this.state.buttonState==='clicked'){
        this.setState({scannedData:data,scanned:true})
     
    }
  <Text>{this.state.scannedData}</Text>
  }
  componentDidMount=async()=>{
    this.getCameraPermissions()
  }
  render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState !== "normal" && hasCameraPermissions&&scanned===false){
      return(
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
       
      );
    }
    else {

    
    return (
      <View style={styles.container}>
        <Image 
                source={require("../assets/220px-Barcode-scanner.jpg")}/>
       
        <TouchableOpacity onPress={()=>{
          this.setState({buttonState:'clicked'})
          this.getCameraPermissions()
          
          }}
          style={{backgroundColor:'lightgreen',marginTop:50}}
          ><Text>Bar Code Scanner</Text></TouchableOpacity>
          <View>
          <Text>{this.state.scannedData}</Text>
          </View>
        
      </View>
    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
