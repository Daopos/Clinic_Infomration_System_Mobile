import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Text, View } from "react-native";

const Index = () => {
  const { token } = useContext(AuthContext);

  return (
    <View>
      <Text>Hello World</Text>
      <Text>{token}</Text>
    </View>
  );
};

export default Index;
