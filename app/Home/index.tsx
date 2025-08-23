import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const Index = () => {
  const { toast } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (toast === "success") {
      Toast.show({
        type: "success",
        text1: "Appointment created!",
      });
    }
  }, [toast]);

  const handleAdd = () => {
    router.push("/Book/Create");
  };

  return (
    <View
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <StatusBar barStyle="dark-content" />

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-3xl font-bold italic p-4 tracking-wider">
          Appointment
        </Text>
        <View className="bg-white rounded-2xl shadow-md p-4 m-2">
          <View className="flex-row justify-between">
            <Text className="text-lg font-bold">Service</Text>
            <Text className="text-gray-600">Pending</Text>
          </View>
          <Text className="mt-2 text-gray-600">Aug 20, 2025</Text>
        </View>
        <View className="bg-white rounded-2xl shadow-md p-4 m-2">
          <View className="flex-row justify-between">
            <Text className="text-lg font-bold">Service</Text>
            <Text className="text-gray-600">Pending</Text>
          </View>
          <Text className="mt-2 text-gray-600">Aug 20, 2025</Text>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-5 right-5 w-14 h-14 bg-sky-600 rounded-full justify-center items-center shadow-lg"
        onPress={handleAdd}
      >
        <Text className="text-white text-3xl font-bold">+</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
};

export default Index;
