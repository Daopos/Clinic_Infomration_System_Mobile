import { AuthContext } from "@/context/AuthContext";
import AppointmentService from "@/services/AppointmentService";
import { AppointmentForm } from "@/types/IAppointment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Create = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const { token } = useContext(AuthContext);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleSubmit = async () => {
    const formData: AppointmentForm = {
      services: selectedValue,
      app_date: date.toISOString(),
    };

    try {
      await AppointmentService.createAppointment(formData);

      // 👇 navigate first
      router.push({
        pathname: "/Home",
        params: { toast: "success" }, // pass param
      });
    } catch (err: any) {
      console.log(err);

      // 👇 show error toast here
      Toast.show({
        type: "error",
        text1: "Failed to create appointment",
        text2: err?.response?.data?.message || "Something went wrong",
        position: "bottom",
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mt-3 p-4">
        {/* Dropdown / Selection Input */}
        <Text className="mb-2 text-gray-600 font-medium">Select a service</Text>
        <View
          className="border border-gray-300 rounded-lg bg-white"
          style={{
            overflow: "hidden", // for iOS rounded border
          }}
        >
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            dropdownIconColor="black" // Android dropdown arrow color
            style={{
              color: Platform.OS === "ios" ? "black" : "black", // text color
              height: Platform.OS === "ios" ? 200 : 50,
            }}
            itemStyle={{
              color: "black", // iOS text color in wheel
            }}
          >
            <Picker.Item label="-- Choose an option --" value="" />
            <Picker.Item label="Option 1" value="option1" />
            <Picker.Item label="Option 2" value="option2" />
            <Picker.Item label="Option 3" value="option3" />
          </Picker>
        </View>

        {/* Date & Time Input */}
        <Text className="mt-5 mb-2 text-gray-600 font-medium">
          Pick Date & Time
        </Text>
        <TouchableOpacity
          className="border border-gray-300 rounded-lg p-3 bg-white"
          onPress={() => setShowPicker(true)}
        >
          <Text className={date ? "text-gray-900" : "text-gray-400"}>
            {date ? date.toLocaleString() : "Select date & time"}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <TouchableOpacity
          className="bg-blue-500 p-4 mt-5 rounded"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center">Submit</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default Create;
