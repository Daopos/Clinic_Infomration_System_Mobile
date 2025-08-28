import { AuthContext } from "@/context/AuthContext";
import { loginService } from "@/services/AuthService";
import { LoginForm } from "@/types/IAuth";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState<LoginForm>({
    email: "mobile@gmail.com",
    password: "123456",
  });
  type FormField = keyof LoginForm;

  const handleChange = (name: FormField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const response = await loginService(formData);
      login(response.token);

      router.replace("/Home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 p-5 bg-white justify-center">
        <Text className="text-4xl font-bold text-center text-gray-800 mb-2">
          Sign In
        </Text>

        <Text className="text-gray-500 mb-2">Email</Text>
        <TextInput
          placeholder="Enter email"
          className="border p-3 mb-4"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
        />

        <Text className="text-gray-500 mb-2">Password</Text>
        <TextInput
          placeholder="Enter password"
          className="border p-3 mb-4"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
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
