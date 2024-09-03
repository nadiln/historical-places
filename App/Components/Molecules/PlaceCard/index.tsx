import { Place } from "@Screens/HistoricalPlacesStack/HomeScreen";
import clsx from "clsx";
import { View, Image, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import RemixIcon from "react-native-remix-icon";

type PlaceCardProps = {
  place: Place;
  onMarkAsVisited: (placeId: number) => void;
};

export default function PlaceCard({ place, onMarkAsVisited }: PlaceCardProps) {
  return (
    <TouchableOpacity>
      <View className="flex-col m-3 bg-white rounded-2xl">
        <Image
          resizeMode="center"
          className="h-64 w-full mt-[-13px] rounded-t-2xl "
          source={require("./sigiriya.jpg")}
        />
        <View className="px-4 pb-4 flex-row justify-between">
          <View
            className="w-60
         pr-2 ">
            <Text className="text-lg font-normal">{place.title}</Text>
            <Text className="text-sm text-gray-500">{place.description}</Text>
          </View>
          <View className="flex-col items-center justify-center">
            <TouchableOpacity onPress={() => onMarkAsVisited(place.id)}>
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
