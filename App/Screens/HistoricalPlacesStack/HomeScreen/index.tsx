import PlaceCard from "App/Components/Molecules/PlaceCard";
import { FlatList, Text, View } from "react-native";
import { useEffect } from "react";
import { useHistoricalPlaces } from "@Store/HistoricalPlacesCtx";
import { fetchHistoricalPlaces } from "@Api/historicalPlaces";
import ScreenSurface from "@Components/Atoms/ScreenSurface";
import NavigationTopBar from "@Components/Atoms/NavigationTopBar";
import { useNavigation } from "@react-navigation/native";
import { HistoricalPlacesStackProps, HistoricalPlaceStackParamList } from "..";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<HistoricalPlaceStackParamList, "HomeScreen">;
};

export type Place = {
  id: number;
  title: string;
  description: string;
  image: string;
  isVisited?: boolean;
};

type Places = Place[];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { places, updatedVisitedStatus, navigateToDetailScreen } = useHomeScreen(navigation);
  // console.log("places", places?.length);

  const renderItem = ({ item }: { item: Place }) => {
    return (
      <PlaceCard
        place={{
          image: item.image,
          title: item.title.substring(0, 20) + "...",
          description: item.description.substring(0, 50) + "...",
          id: item.id,
          isVisited: item.isVisited,
        }}
        updatedVisitedStatus={updatedVisitedStatus}
        navigateToDetailScreen={navigateToDetailScreen}
      />
    );
  };
  return (
    <ScreenSurface>
      <View className="bg-gray-200 ">
        <NavigationTopBar title="Historical Places" />

        <View className="mb-44 ">
          {places ? (
            <FlatList
              data={places}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            <View className="items-center justify-center ">
              <Text>Loading...</Text>
            </View>
          )}
        </View>
      </View>
    </ScreenSurface>
  );
}

type UseHomeScreenProps = {
  navigation: HomeScreenProps["navigation"];
};

function useHomeScreen(navigation: HomeScreenProps["navigation"]) {
  const { places, setHistoricalPlaces, setPlaces } = useHistoricalPlaces();

  const updatedVisitedStatus = (id: number) => {
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

  useEffect(() => {
    (async () => {
      // console.log("HomeScreen mounted");
      if (places === undefined) {
        const data = await fetchHistoricalPlaces();

        if (data) {
          setHistoricalPlaces(data);
        }

        // console.log(data);
      }
    })();
  }, [places]);

  const navigateToDetailScreen = (id: number) => {
    const selectedPlace = places?.find((place) => place.id === id);
    if (!selectedPlace) return;
    navigation.navigate("DetailScreen", { place: selectedPlace });
  };
  return {
    places,
    updatedVisitedStatus,
    navigateToDetailScreen,
  };
}
