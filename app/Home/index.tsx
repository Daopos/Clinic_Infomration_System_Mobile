import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const Index = () => {
  const handleAdd = () => {
    router.push("/Book/Create");
  };

  return (
    <View className="flex-1">
      <Text className="text-lg p-4">Hello World</Text>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-5 right-5 w-14 h-14 bg-sky-600 rounded-full justify-center items-center shadow-lg"
        onPress={handleAdd}
      >
        <Text className="text-white text-3xl font-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
