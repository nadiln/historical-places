import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import { HistoricalPlacesProvider } from "App/Store/HistoricalPlacesCtx";
import PlaceDetailScreen from "@Screens/HistoricalPlacesStack/PlaceDetailScreen";
import { NavigatorScreenParams } from "@react-navigation/native";

export type HistoricalPlaceStackParamList = {
  HomeScreen?: undefined;
  DetailScreen?: { id: number };
};

const HistoricalPlaceStack = createNativeStackNavigator<HistoricalPlaceStackParamList>();

export type HistoricalPlacesStackProps = object;

function HistoricalPlacesStack({}: HistoricalPlacesStackProps) {
  return (
    <HistoricalPlacesProvider>
      <HistoricalPlaceStack.Navigator screenOptions={{ headerShown: false }}>
        <HistoricalPlaceStack.Screen name="HomeScreen" component={HomeScreen} />
        <HistoricalPlaceStack.Screen name="DetailScreen" component={PlaceDetailScreen} />
      </HistoricalPlaceStack.Navigator>
    </HistoricalPlacesProvider>
  );
}

export default HistoricalPlacesStack;
