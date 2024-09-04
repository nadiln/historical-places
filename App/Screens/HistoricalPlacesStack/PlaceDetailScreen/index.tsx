import NavigationTopBar from "@Components/Atoms/NavigationTopBar";
import ScreenSurface from "@Components/Atoms/ScreenSurface";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { Place } from "../HomeScreen/index";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { HistoricalPlaceStackParamList } from "..";
import { clsx } from "clsx";
import { useHistoricalPlaces } from "@Store/HistoricalPlacesCtx";
import { useEffect, useState } from "react";

type PlaceDetailScreenProps = {
  navigation: NativeStackNavigationProp<HistoricalPlaceStackParamList, "DetailScreen">;
  route: {
    params: {
      place: Place;
    };
  };
};

export default function PlaceDetailScreen({ navigation, route }: PlaceDetailScreenProps) {
  const place = route.params.place;
  const { goBack, updateVisitedStatus, currentPlace } = usePlaceDetailScreen({ navigation, place });
  return (
    <ScreenSurface>
      <NavigationTopBar title="Place Detais" showBackButton backAction={goBack} />
      <View className="flex-col justify-start flex-1 ">
        <View className="aspect-square ">
          <Image
            resizeMode="contain"
            className="w-full h-full rounded-t-2xl "
            source={{
              uri: currentPlace?.image,
            }}
            onError={(error) => console.log("Image Load Error:", error.nativeEvent.error)}
          />
        </View>
        <View className="px-4 py-1">
          <Text className="text-lg font-semibold">{currentPlace?.title}</Text>
          <Text className="mt-4 text-sm text-gray-500">{currentPlace?.description}</Text>
          <TouchableOpacity
            onPress={() => updateVisitedStatus(currentPlace?.id as unknown as number)}
            className={clsx("items-center p-2 mt-10  rounded-lg", {
              "bg-green-500": !currentPlace?.isVisited,
              "bg-red-500": currentPlace?.isVisited,
            })}>
            <Text className="text-lg text-white">
              {currentPlace?.isVisited ? "Mark as Not Visited" : "Mark as Visited"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenSurface>
  );
}

type UsePlaceDetailScreenProps = {
  navigation: PlaceDetailScreenProps["navigation"];
  place: Place;
};
function usePlaceDetailScreen({ navigation, place }: UsePlaceDetailScreenProps) {
  const { places, setPlaces } = useHistoricalPlaces();
  const [responseMsg, setResponseMsg] = useState<Place | undefined>(undefined);

  const [currentPlace, setCurrentPlace] = useState<Place | null>(null);

  useEffect(() => {
    const currentPlace = places?.find((p) => p.id === place.id);
    setCurrentPlace(currentPlace as unknown as Place);
  }, [places]);
  const goBack = () => {
    console.log("goBack---------");
    navigation.goBack();
  };

  const updateVisitedStatus = (id: number) => {
    // console.log("-------- id", id);

    const updatedPlaces = places?.map((place: Place) => {
      if (place.id === id) {
        return {
          ...place,
          isVisited: !place.isVisited,
        };
      }
      return place;
    }); //

    setPlaces(updatedPlaces);
  };
  return {
    goBack,
    updateVisitedStatus,
    currentPlace,
  };
}
