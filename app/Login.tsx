import { AuthContext } from "@/context/AuthContext";
import { router } from "expo-router";
import { useContext } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const { login } = useContext(AuthContext);

  const handleSubmit = () => {
    login("test");

    router.replace("/Home");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 p-5 bg-white justify-center">
        <Text className="text-4xl font-bold text-center text-gray-800 mb-2">
          Sign In
        </Text>

        <Text className="text-gray-500 mb-2">Email</Text>
        <TextInput
          placeholder="useless placeholder"
          className="border p-3 mb-4"
        />

        <Text className="text-gray-500 mb-2">Password</Text>
        <TextInput
          placeholder="useless placeholder"
          className="border p-3 mb-4"
        />

        <TouchableOpacity
          className="bg-blue-500 p-4 mt-5 rounded"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center">Sign in</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mt-5">
          <Text className="text-md">Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => router.replace("/")}>
            <Text className="text-green-600 text-md">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
