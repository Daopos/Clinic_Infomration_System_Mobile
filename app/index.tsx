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

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupForm | "confirmPassword", string>>
  >({});

  type FormField = keyof SignupForm;

  const handleChange = (name: FormField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "", // clear error on typing
    }));
  };

  const validate = () => {
    let newErrors: Partial<
      Record<keyof SignupForm | "confirmPassword", string>
    > = {};

    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await signup(formData);
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
          Create Account
        </Text>
        <Text className="text-center text-gray-500 mb-8">
          Sign up to get started
        </Text>

        {/* First Name */}
        <Text className="text-gray-500 mb-2">First Name</Text>
        <TextInput
          placeholder="First name"
          className="border p-3"
          value={formData.firstname}
          onChangeText={(text) => handleChange("firstname", text)}
        />
        {errors.firstname && (
          <Text className="text-red-500">{errors.firstname}</Text>
        )}

        {/* Middle Name */}
        <Text className="text-gray-500 mb-2">Middle Name</Text>
        <TextInput
          placeholder="Middle name"
          className="border p-3"
          value={formData.middlename}
          onChangeText={(text) => handleChange("middlename", text)}
        />
        {errors.middlename && (
          <Text className="text-red-500">{errors.middlename}</Text>
        )}

        {/* Last Name */}
        <Text className="text-gray-500 mb-2">Last Name</Text>
        <TextInput
          placeholder="Last name"
          className="border p-3"
          value={formData.lastname}
          onChangeText={(text) => handleChange("lastname", text)}
        />
        {errors.lastname && (
          <Text className="text-red-500">{errors.lastname}</Text>
        )}

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
        {errors.email && <Text className="text-red-500">{errors.email}</Text>}

        {/* Password */}
        <Text className="text-gray-500 mb-2">Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry
          className="border p-3"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        {errors.password && (
          <Text className="text-red-500">{errors.password}</Text>
        )}

        {/* Confirm Password */}
        <Text className="text-gray-500 mb-2">Confirm Password</Text>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          className="border p-3"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errors.confirmPassword && (
          <Text className="text-red-500">{errors.confirmPassword}</Text>
        )}

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
