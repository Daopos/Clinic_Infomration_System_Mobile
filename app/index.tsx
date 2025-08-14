import { AuthContext } from "@/context/AuthContext";
import { signup } from "@/services/AuthService";
import { SignupForm } from "@/types/IAuth";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import "./global.css";

const Index = () => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState<SignupForm>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    middlename: "",
  });

  type FormField = keyof SignupForm;

  const handleChange = (name: FormField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await signup(formData);
      login("test");
      router.replace("/Home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 p-5 bg-white justify-center">
        <Text className="text-4xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </Text>
        <Text className="text-center text-gray-500 mb-8">
          Sign up to get started
        </Text>

        {/* First Name */}
        <Text className="text-gray-500 mb-2">First Name</Text>
        <TextInput
          placeholder="First name"
          className="border p-3 "
          value={formData.firstname}
          onChangeText={(text) => handleChange("firstname", text)}
        />
        <Text className="mb-4">testsss</Text>

        {/* Middle Name */}
        <Text className="text-gray-500 mb-2">Middle Name</Text>
        <TextInput
          placeholder="Middle name"
          className="border p-3"
          value={formData.middlename}
          onChangeText={(text) => handleChange("middlename", text)}
        />

        {/* Last Name */}
        <Text className="text-gray-500 mb-2">Last Name</Text>
        <TextInput
          placeholder="Last name"
          className="border p-3"
          value={formData.lastname}
          onChangeText={(text) => handleChange("lastname", text)}
        />

        {/* Email */}
        <Text className="text-gray-500 mb-2">Email</Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          className="border p-3"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
        />

        {/* Password */}
        <Text className="text-gray-500 mb-2">Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          className="border p-3"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
        />

        {/* Confirm Password */}
        <Text className="text-gray-500 mb-2">Confirm Password</Text>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          className="border p-3"
          // You can add a separate confirmPassword state if needed
        />

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-blue-500 p-4 mt-5 rounded"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center">Sign up</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mt-5">
          <Text className="text-md">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.replace("/Login")}>
            <Text className="text-green-600 text-md">Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;
