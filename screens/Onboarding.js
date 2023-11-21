import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
    <Onboarding
      onSkip={() => navigation.replace("BottomNavigation")}
      onDone={() => navigation.replace("BottomNavigation")}
      containerStyles={{ paddingHorizontal: 30 }} // Margin horizontal for all screens

      bottomBarColor='white'
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../images/tasty.jpg")}
              style={{height:400, width:400, marginBottom:-50}}
            />
          ),
          title: "Delicious!",
          subtitle:
            "Good food made great. Enjoy a guilt-free feast with our healthy fast food options.",
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../images/fast.jpg")} style={{height:400, width:300, marginBottom:-50}} />,
          title: "Speed",
          subtitle:
            "Quick, convenient, and oh-so-healthy! Discover a new way to satisfy your cravings.",
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../images/healthy.jpg")} style={{height:400, width:300, marginBottom:-50}} />,
          title: "Healthy Eating",
          subtitle:
            "Fuel your body with our nutrient-packed meals Healthy choices made easy.",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
