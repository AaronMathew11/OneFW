import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import BigCard from "../components/BigCard";
import { useIsFocused } from "@react-navigation/native";


const Home = ({ navigation }) => {
  const isFocused = useIsFocused();

  const top = [
    {
      image:
        "https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3BhZ2hldHRpJTIwQ2FyYm9uYXJhfGVufDB8fDB8fHww",
      foodName: "Pasta",
    },
    {
      foodName: "Chicken",
      image:
        "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMHNhbGFkfGVufDB8fDB8fHww",
    },
    {
      foodName: "Tacos",
      image:
        "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGFjb3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      foodName: "Stir-Fry",
      image:
        "https://plus.unsplash.com/premium_photo-1664472637341-3ec829d1f4df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmVnZXRhYmxlJTIwc3RpciUyMGZyeXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      foodName: "Fish",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fHww",
    },
    {
      foodName: "Risotto",
      image:
        "https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaHJvb20lMjByaXNvdHRvfGVufDB8fDB8fHww",
    },
    {
      foodName: "Pizza",
      image:
        "https://plus.unsplash.com/premium_photo-1675451537771-0dd5b06b3985?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHx8MHx8fDA%3D",
    },
    {
      foodName: "Scampi",
      image:
        "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hyaW1wJTIwc2NhbXBpfGVufDB8fDB8fHww",
    },

    {
      foodName: "Tofu",
      image:
        "https://plus.unsplash.com/premium_photo-1664648005718-91b617643af5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG9mdXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      foodName: "Salad",
      image:
        "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2FsYWR8ZW58MHx8MHx8fDA%3D",
    },
    {
      foodName: "Chili",
      image:
        "https://images.unsplash.com/photo-1638329389022-daef2efb71b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbGl8ZW58MHx8MHx8fDA%3D",
    },
    {
      foodName: "Sandwich",
      image:
        "https://images.unsplash.com/photo-1638537125835-82acb38d3531?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2FuZHdpdGNofGVufDB8fDB8fHww",
    },
    {
      foodName: "Fruits",
      image:
        "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJ1aXQlMjBib3dsfGVufDB8fDB8fHww",
    },
  ];

  const foodItems = [
    {
      foodName: "Beef Tacos",
      makeTime: "25 minutes",
      price: "$10.99",
      rating: "4.7",
      image:
        "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGFjb3N8ZW58MHx8MHx8fDA%3D",
      description:
        "Tortillas filled with seasoned beef, salsa, cheese, and veggies.",
    },
    {
      foodName: "Vegetable Stir-Fry",
      makeTime: "15 minutes",
      price: "$8.99",
      rating: "4.4",
      image:
        "https://plus.unsplash.com/premium_photo-1664472637341-3ec829d1f4df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmVnZXRhYmxlJTIwc3RpciUyMGZyeXxlbnwwfHwwfHx8MA%3D%3D",
      description: "Assorted vegetables stir-fried in a savory sauce.",
    },

    {
      foodName: "Shrimp Scampi",
      makeTime: "20 minutes",
      price: "$14.49",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hyaW1wJTIwc2NhbXBpfGVufDB8fDB8fHww",
      description: "Shrimp cooked in a garlic-butter sauce served over pasta.",
    },

    {
      foodName: "Tofu Pad Thai",
      makeTime: "25 minutes",
      price: "$9.99",
      rating: "4.4",
      image:
        "https://plus.unsplash.com/premium_photo-1664648005718-91b617643af5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG9mdXxlbnwwfHwwfHx8MA%3D%3D",
      description:
        "Stir-fried rice noodles with tofu, peanuts, and vegetables.",
    },

    {
      foodName: "Vegetarian Chili",
      makeTime: "40 minutes",
      price: "$9.99",
      image:
        "https://images.unsplash.com/photo-1638329389022-daef2efb71b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpbGl8ZW58MHx8MHx8fDA%3D",

      rating: "4.7",
      description: "Hearty chili made with beans, vegetables, and spices.",
    },
  ];



  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View>
          <View>
            <ScrollView
              horizontal={true}
              style={{ marginRight: 20, marginLeft: 20 }}
            >
              {top.map((item, index) => (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: 100,
                    }}
                  ></Image>
                  <Text style={{ marginTop: 6, color: "grey" }}>
                    {item.foodName}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <Pressable
            style={{ width: "100%", height: 200, paddingHorizontal: 20 }}
          >
            <Image
              source={require("../images/Banner.png")}
              resizeMode='contain'
              style={{ width: undefined, height: undefined, flex: 1 }}
            ></Image>
          </Pressable>
          <Text style={{ marginLeft: 20, fontSize: 18, marginBottom: 15 }}>
            Top Picks this Week!
          </Text>
          {/* <FlatList
          data={foodItems}
          renderItem={({ item, index }) => (
            <BigCard item={item} navigation={navigation} />
          )}
        /> */}
          {foodItems.map((item, index) => (
            <BigCard key={index} item={item} navigation={navigation} />
          ))}

          {/* <BigCard navigation={navigation}/> */}
          {/* <BigCard />
        <BigCard />
        <BigCard /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
