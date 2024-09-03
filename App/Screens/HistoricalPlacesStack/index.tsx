import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import { HistoricalPlacesProvider } from "App/Store/HistoricalPlacesCtx";
import PlaceDetailScreen from "@Screens/HistoricalPlacesStack/PlaceDetailScreen";

const HistoricalPlaceStack = createNativeStackNavigator();

function HistoricalPlacesStack() {
  return (
    <HistoricalPlacesProvider>
      <HistoricalPlaceStack.Navigator screenOptions={{ headerShown: false }}>
        <HistoricalPlaceStack.Screen name="HistoricalPlaces" component={HomeScreen} />
        <HistoricalPlaceStack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
      </HistoricalPlaceStack.Navigator>
    </HistoricalPlacesProvider>
  );
}

export default HistoricalPlacesStack;
