import { Place } from "@Screens/HistoricalPlacesStack/HomeScreen";
import clsx from "clsx";
import { View, Image, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import RemixIcon from "react-native-remix-icon";

type PlaceCardProps = {
  place: Place;
  updatedVisitedStatus: (placeId: number) => void;
  navigateToDetailScreen: (placeId: number) => void;
};

export default function PlaceCard({
  place,
  updatedVisitedStatus,
  navigateToDetailScreen,
}: PlaceCardProps) {
  return (
    <TouchableOpacity onPress={() => navigateToDetailScreen(place.id)}>
      <View className="flex-col m-3 bg-white rounded-2xl">
        <Image
          resizeMode="center"
          className="w-full h-64 rounded-t-2xl "
          // source={require("./sigiriya.jpg")}
          source={{ uri: place.image }}
        />
        <View className="flex-row justify-between px-4 pb-4">
          <View className="pr-2 w-60 ">
            <Text className="text-lg font-normal">{place.title}</Text>
            <Text className="text-sm text-gray-500">{place.description}</Text>
          </View>
          <View className="flex-col items-center justify-center">
            <TouchableOpacity onPress={() => updatedVisitedStatus(place.id)}>
              <RemixIcon name="heart-3-line" size={24} color={place.isVisited ? "green" : "red"} />
            </TouchableOpacity>
            <Text
              className={clsx("", {
                "text-green-500": place.isVisited,
                "text-red-500": !place.isVisited,
              })}>
              {place.isVisited ? "Visited" : "Not Visited"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
