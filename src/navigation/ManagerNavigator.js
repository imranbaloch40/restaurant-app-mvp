import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManagerDashboard from "../screens/manager/DashboardScreen";

const Stack = createNativeStackNavigator();

export default function ManagerNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ManagerDashboard"
        component={ManagerDashboard}
        options={{ title: "Manager Dashboard" }}
      />
    </Stack.Navigator>
  );
}