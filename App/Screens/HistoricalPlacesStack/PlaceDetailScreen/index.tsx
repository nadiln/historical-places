import ScreenSurface from "@Components/Atoms/ScreenSurface";
import { Text, View } from "react-native";

export default function PlaceDetailScreen() {
  return (
    <ScreenSurface>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Place Detail Screen</Text>
      </View>
    </ScreenSurface>
  );
}

function usePlaceDetailScreen() {
  return {};
}
