import { View, Text, Image, StyleSheet } from 'react-native'
import { React, useState } from "react";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";



const Ingredients = ({item}) => {
    const [isChecked, setChecked] = useState(false);

    console.log(item.image)

  return (
    <View style={{marginBottom:16}}>
    <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginHorizontal:30}}>
      <View style={{display:'flex', flexDirection:'row'}}>
      <Image
        source={item.image}
        style={{ height: 51, width: 51 , marginRight:30}}
      ></Image>
      <View >
        <Text>{item.foodName}</Text>
        <Text>{item.price}</Text>
      </View>
      </View>
      <View
        style={{
          display: "flex",
          gap: 10,
          flexDirection: "row",
        }}
      >
        {/* <Ionicons
          name='remove'
          size={20}
          color='grey'
          style={{ marginRight: 5 }}
        />
        <Text style={{ fontSize: 16, color: "grey" }}>1</Text>

        <Ionicons name='add' size={20} color='grey' /> */}
      </View>
      <View>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#D82866" : undefined}
        />
      </View>
    </View>
  </View>
  )
}

export default Ingredients

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
      marginVertical: 32,
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paragraph: {
      fontSize: 15,
    },
    checkbox: {
      margin: 8,
    },
  });
  