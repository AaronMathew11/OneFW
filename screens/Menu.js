import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SmallCard from "../components/SmallCard";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";

const foodItems = [
  {
    foodName: "Spaghetti Carbonara",
    makeTime: "30 minutes",
    price: "$12.99",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3BhZ2hldHRpJTIwQ2FyYm9uYXJhfGVufDB8fDB8fHww",
    description: "Classic Italian pasta dish with creamy sauce and bacon.",
  },
  {
    foodName: "Chicken Caesar Salad",
    makeTime: "20 minutes",
    price: "$9.49",
    image:
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMHNhbGFkfGVufDB8fDB8fHww",
    rating: "4.5",
    description:
      "Fresh salad with grilled chicken, romaine lettuce, croutons, and Caesar dressing.",
  },
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
    foodName: "Grilled Salmon",
    makeTime: "25 minutes",
    price: "$13.49",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fHww",
    rating: "4.9",
    description: "Fresh salmon fillet grilled to perfection.",
  },
  {
    foodName: "Mushroom Risotto",
    makeTime: "35 minutes",
    price: "$11.99",
    image:
      "https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaHJvb20lMjByaXNvdHRvfGVufDB8fDB8fHww",
    rating: "4.6",
    description: "Creamy rice dish cooked with flavorful mushrooms.",
  },
  {
    foodName: "BBQ Chicken Pizza",
    makeTime: "30 minutes",
    price: "$12.99",
    rating: "4.7",
    image:
      "https://plus.unsplash.com/premium_photo-1675451537771-0dd5b06b3985?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHx8MHx8fDA%3D",
    description:
      "Pizza topped with barbecue sauce, chicken, cheese, and onions.",
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
    foodName: "Eggplant Parmesan",
    makeTime: "35 minutes",
    price: "$10.99",
    rating: "4.5",
    image:
      "https://images.unsplash.com/photo-1505575967455-40e256f73376?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdncGxhbnQlMjBwYXJtZXNhbnxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Breaded and baked eggplant slices topped with marinara sauce and cheese.",
  },
  {
    foodName: "Tofu Pad Thai",
    makeTime: "25 minutes",
    price: "$9.99",
    rating: "4.4",
    image:
      "https://plus.unsplash.com/premium_photo-1664648005718-91b617643af5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dG9mdXxlbnwwfHwwfHx8MA%3D%3D",
    description: "Stir-fried rice noodles with tofu, peanuts, and vegetables.",
  },
  {
    foodName: "Honey Garlic Chicken",
    makeTime: "30 minutes",
    price: "$11.49",
    rating: "4.6",
    image:
      "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2tlbiUyMHdpbmdzfGVufDB8fDB8fHww",
    description: "Chicken cooked in a sweet and savory honey garlic sauce.",
  },
  {
    foodName: "Quinoa Salad",
    makeTime: "15 minutes",
    price: "$8.99",
    rating: "4.3",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2FsYWR8ZW58MHx8MHx8fDA%3D",

    description:
      "Healthy salad with quinoa, mixed greens, and assorted veggies.",
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
  {
    foodName: "Caprese Sandwich",
    makeTime: "20 minutes",
    price: "$7.49",
    rating: "4.5",
    image:
      "https://images.unsplash.com/photo-1638537125835-82acb38d3531?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2FuZHdpdGNofGVufDB8fDB8fHww",

    description:
      "Sandwich with fresh mozzarella, tomatoes, basil, and balsamic glaze.",
  },
  {
    foodName: "Fruit Smoothie Bowl",
    makeTime: "10 minutes",
    price: "$6.99",
    image:
      "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJ1aXQlMjBib3dsfGVufDB8fDB8fHww",

    rating: "4.6",
    description: "Smoothie bowl topped with assorted fruits and granola.",
  },
];

const Menu = ({ navigation }) => {
  const db = SQLite.openDatabase("db.db");
  const route = useRoute();
  const item= route.params?.data

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoodItems, setFilteredFoodItems] = useState(foodItems);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  useEffect(()=>{
    if(item!=undefined)
    setSearchQuery(item)
  },[item])

  useEffect(() => {
    const filteredItems = foodItems.filter((item) =>
      item.foodName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFoodItems(filteredItems);
  }, [searchQuery]);





  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `CREATE TABLE IF NOT EXISTS favorites (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         foodName TEXT,
  //         image TEXT,
  //         description TEXT,
  //         price TEXT
  //       );`,
  //       [], // Pass an empty array as the second parameter if there are no variables to bind
  //       () => console.log("Table favorites created successfully"),
  //       (txObj, error) => console.log("Error creating table:", error)
  //     );
  //   });
  // }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1, paddingBottom: 20 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 5,
          borderColor: "grey",
          marginHorizontal: 20,
          padding: 10,
        }}
      >
        <Ionicons
          name='search'
          size={14}
          color='grey'
          style={{ marginRight: 5 }}
        />
        <TextInput
          onChangeText={handleSearch}
          placeholder='Search delicious food ...'
          value={searchQuery}
        ></TextInput>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#D82866",
            borderRadius: 20,
            marginRight: 10,
          }}
        >
          <Text
            style={{ color: "white", width: "auto", padding: 8 }}
            onPress={() => setSearchQuery("chicken")}
          >
            Chicken
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#D82866",
            borderRadius: 20,
            marginRight: 10,
          }}
        >
          <Text
            style={{ color: "white", width: "auto", padding: 8 }}
            onPress={() => setSearchQuery("pizza")}
          >
            Pizza
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#D82866",
            borderRadius: 20,
            marginRight: 10,
          }}
        >
          <Text
            style={{ color: "white", width: "auto", padding: 8 }}
            onPress={() => setSearchQuery("salad")}
          >
            Salad
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#D82866",
            borderRadius: 20,
            marginRight: 10,
          }}
        >
          <Text
            style={{ color: "white", width: "auto", padding: 8 }}
            onPress={() => setSearchQuery("Spaghetti")}
          >
            Pasta
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#D82866",
            borderRadius: 20,
            marginRight: 10,
          }}
        >
          <Text
            style={{ color: "white", width: "auto", padding: 8 }}
            onPress={() => setSearchQuery("sandwich")}
          >
            Sandwich
          </Text>
        </View>
      </View>

      <FlatList
        data={filteredFoodItems}
        renderItem={({ item, index }) => (
          <SmallCard item={item} navigation={navigation} />
        )}
      ></FlatList>
    </View>
  );
};

export default Menu;
