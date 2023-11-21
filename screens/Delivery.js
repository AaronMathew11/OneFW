import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Linking,
} from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import MapView, { Marker } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

const Delivery = () => {
  const [mapReady, setMapReady] = useState(false);
  const [click, setClick] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [current, setCurrent] = useState("test");

  const onMapLayout = () => {
    setMapReady(true);
  };

  const url = "upi://pay?pa=aa@axl&pn=a%20a&mc=0000&mode=02&purpose=00";

    const [mapRegion, setMapRegion] = useState({
      latitude: 12.9692,
      longitude: 79.1559,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0021,
    });
  
    const [selectedMarker, setSelectedMarker] = useState({
      id: 1,
      latitude: 12.9692,
      longitude: 79.1559,
      title: selectedLanguage,
      color: "red",
      description:
        "We are mainly based in Jamshedpur .... click on the blue markers to view YLF Open Kitchens and red markers to view YLF Open Homes near you !",
    });
  
    const markers = [
      {
        id: 1,
        latitude: 12.9692,
        longitude: 79.1559,
        title: "One Food World",
        color: "red",
        description:
          "We are mainly based in Jamshedpur ....Click on the blue markers to view YLF Open Kitchens and red markers to view YLF Open Homes near you !",
      },
      {
        id: 2,
        latitude: 12.969903,
        longitude: 79.1559,
        title: selectedLanguage,
        color: "blue",
        description: "Another marker with a different description.",
      },

    ];
  
    const handleMarkerPress = (marker) => {
      setSelectedMarker(marker);
    };

  return (
    <GestureHandlerRootView style={styles.container}>
      {!click && (
        <View style={{ marginTop: 70, paddingHorizontal: 30 }}>
          <Text style={{marginBottom:20, fontSize:18}}>Dining/takeaway</Text>
          <RadioButtonGroup
        containerStyle={{ marginBottom: 20 }}
        selected={current}
        onSelected={(value) => setCurrent(value)}
        radioBackground="#D82866"
      >
        <View style={{marginBottom:12}}>
        <RadioButtonItem value="test2" label="Takeaway" />
        </View>
        <RadioButtonItem value="test1" label="Delivery" />

      </RadioButtonGroup>
      {current=="test1" && (
        <View>
          <Text style={{ fontSize: 18 }}>Delivery Address</Text>
          <View
          style={{marginTop:20, marginBottom:20}}
          >
            {/* <Image
              source={{
                uri: "https://png.pngtree.com/png-clipart/20230123/original/pngtree-flat-red-location-sign-png-image_8927579.png",
              }}
              style={{ height: 50, width: 50, borderRadius: 20 }}
            ></Image> */}
          <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
            >
              <Picker.Item label='A Block' value='A' />
              <Picker.Item label='B Block' value='B' />
              <Picker.Item label='C Block' value='C' />
              <Picker.Item label='D Block' value='D' />
              <Picker.Item label='E Block' value='E' />
              <Picker.Item label='F Block' value='F' />
              <Picker.Item label='G Block' value='G' />
              <Picker.Item label='H Block' value='H' />
              <Picker.Item label='J Block' value='J' />
              <Picker.Item label='K Block' value='K' />
              <Picker.Item label='L Block' value='L' />
              <Picker.Item label='M Block' value='M' />
              <Picker.Item label='N Block' value='N' />
              <Picker.Item label='P Block' value='P' />
              <Picker.Item label='Q Block' value='Q' />
              <Picker.Item label='R Block' value='R' />

            </Picker>
          </View>
          </View>
)}
          <Text style={{ fontSize: 18 }}>Choose your mode of payment</Text>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "grey",
              marginTop: 10,
              marginBottom: 20,
            }}
          ></View>
          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
            onPress={() => {
              Linking.openURL(url);
              setClick(true);
            }}
          >
            <Image
              source={{
                uri: "https://play-lh.googleusercontent.com/HArtbyi53u0jnqhnnxkQnMx9dHOERNcprZyKnInd2nrfM7Wd9ivMNTiz7IJP6-mSpwk",
              }}
              style={{ height: 50, width: 50, borderRadius: 20 }}
            ></Image>
            <Text style={{ fontSize: 16 }}>Google Pay</Text>
          </Pressable>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginTop: 15,
            }}
          >
            <Image
              source={{
                uri: "https://cdn.standardmedia.co.ke/images/wednesday/zovkvynqbe4w4kpol610a8d5dd50d9.jpg",
              }}
              style={{ height: 40, width: 50, borderRadius: 20 }}
            ></Image>
            <Text style={{ fontSize: 16 }}>Net Banking</Text>
          </View>
        </View>
      )}
      {click && (
        <View style={{flex:1}} >
         
            <MapView
              style={{ width: "100%", height: "100%" }}
              region={mapRegion}
            >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            pinColor={marker.color}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
            </MapView>
            <View
        style={{
          height: 600,
          width: "100%",
          borderRadius: 30,
          marginTop: -379,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
      <View
            style={{
               marginTop: 30,
              paddingHorizontal: 20,
              display: "flex",
              backgroundColor: "white",
              marginHorizontal: 20,
              flexDirection: "row",
              borderRadius: 10,
              paddingVertical: 10,
              borderWidth:0.4
            }}
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe6OlgV3_wfityVvHwIRWGD9gw05bryFJkkw&usqp=CAU",
              }}
              style={{ height: 70, width: 70, borderRadius: 10 }}
            ></Image>
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 18 }}>Abu Bakar</Text>
              <Text style={{ fontSize: 12, color: "grey" }}>Delivery boy</Text>
            </View>
          </View>

          <View
            style={{
              // marginTop: 550,
              paddingHorizontal: 40,
              display: "flex",
              backgroundColor: "white",
              marginHorizontal: 20,
              marginTop: 15,
              flexDirection: "row",
              borderRadius: 10,
              paddingVertical: 10,
              borderWidth:0.4
            }}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/66/66163.png",
              }}
            ></Image>
            <View>
              <Text style={{ fontSize: 16 }}>Your Delivery Time</Text>
              <Text style={{ fontSize: 13, color: "grey", marginTop: 5 }}>
                30-35 mins (on the way)
              </Text>
            </View>
          </View>

          <View
            style={{
              // marginTop: 550,
              paddingHorizontal: 40,
              display: "flex",
              backgroundColor: "white",
              marginHorizontal: 20,
              marginTop: 15,
              flexDirection: "row",
              borderRadius: 10,
              paddingVertical: 10,
              borderWidth:0.4
            }}
          >
            <Image
              source={{
                uri: "https://i.etsystatic.com/22467704/r/il/33f015/2535134244/il_1080xN.2535134244_i9fm.jpg",
              }}
            ></Image>
            <View>
              <Text style={{ fontSize: 16 }}>Your Delivery Address</Text>
              <Text style={{ fontSize: 13, color: "grey" }}>G Block</Text>
            </View>
          </View>
      </View>
         
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default Delivery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
