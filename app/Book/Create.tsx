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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const { token } = useContext(AuthContext);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        Toast.show({
          type: "error",
          text1: "Invalid date",
          text2: "You cannot select a past date",
          position: "bottom",
        });
        return;
      }

      setDate(selectedDate);
    }

    setShowDatePicker(false);
  };

  const handleSubmit = async () => {
    const finalDate = new Date(date);
    finalDate.setHours(selectedHour);
    finalDate.setMinutes(selectedMinute);

    const formData: AppointmentForm = {
      services: selectedValue,
      app_date: finalDate.toISOString(),
    };

    try {
      await AppointmentService.createAppointment(formData);

      router.push({
        pathname: "/Home",
        params: { toast: "success" },
      });
    } catch (err: any) {
      console.log(err);
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
        {/* Dropdown */}
        <Text className="mb-2 text-gray-600 font-medium">Select a service</Text>
        <View
          className="border border-gray-300 rounded-lg bg-white"
          style={{ overflow: "hidden" }}
        >
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            dropdownIconColor="black"
            style={{
              color: "black",
              height: Platform.OS === "ios" ? 200 : 50,
            }}
            itemStyle={{ color: "black" }}
          >
            <Picker.Item label="-- Choose an option --" value="" />
            <Picker.Item label="Tooth Extraction" value="Tooth Extraction" />
          </Picker>
        </View>

        {/* Date Input */}
        <Text className="mt-5 mb-2 text-gray-600 font-medium">Pick a Date</Text>
        <TouchableOpacity
          className="border border-gray-300 rounded-lg p-3 bg-white"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="text-gray-900">{date.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
            minimumDate={new Date()} // prevent past dates
          />
        )}

        {/* Time Picker (Restricted 8AM–5PM) */}
        {/* Time Picker (Restricted 8AM–5PM, Flexible Minutes) */}
        <Text className="mt-5 mb-2 text-gray-600 font-medium">Pick a Time</Text>
        <View className="flex-row justify-between">
          {/* Hour Picker */}
          <View className="flex-1 mr-2 border border-gray-300 rounded-lg bg-white">
            <Picker
              selectedValue={selectedHour}
              onValueChange={(val) => setSelectedHour(val)}
            >
              {[...Array(10)].map((_, i) => {
                const hour = i + 8; // 8 → 17
                return (
                  <Picker.Item
                    key={hour}
                    label={`${hour.toString().padStart(2, "0")}:00`}
                    value={hour}
                  />
                );
              })}
            </Picker>
          </View>

          {/* Minute Picker (0–59) */}
          <View className="flex-1 ml-2 border border-gray-300 rounded-lg bg-white">
            <Picker
              selectedValue={selectedMinute}
              onValueChange={(val) => setSelectedMinute(val)}
            >
              {[...Array(60)].map((_, m) => (
                <Picker.Item
                  key={m}
                  label={m.toString().padStart(2, "0")}
                  value={m}
                />
              ))}
            </Picker>
          </View>
        </View>

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
