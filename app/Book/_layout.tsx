import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function BookLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="Create"
          options={{ headerShown: true, title: "Create Appointment" }}
        />
        {/* All other screens will have header by default */}
      </Stack>
    </AuthProvider>
  );
}
