import PlaceCard from "App/Components/Molecules/PlaceCard";
import { FlatList, Text, View } from "react-native";
import { useEffect } from "react";
import { useHistoricalPlaces } from "@Store/HistoricalPlacesCtx";
import { fetchHistoricalPlaces } from "@Api/historicalPlaces";
import ScreenSurface from "@Components/Atoms/ScreenSurface";
import NavigationTopBar from "@Components/Atoms/NavigationTopBar";

type HomeScreenProps = {};

export type Place = {
  id: number;
  title: string;
  description: string;
  image: string;
  isVisited?: boolean;
};

type Places = Place[];

export default function HomeScreen({}: HomeScreenProps) {
  const { places, markVisited } = useHomeScreen();
  // console.log("places", places?.length);

  const renderItem = ({ item }: { item: Place }) => {
    return (
      <PlaceCard
        place={{
          image: "https://via.placeholder.com/150",
          title: item.title.substring(0, 20) + "...",
          description: item.description.substring(0, 50) + "...",
          id: item.id,
          isVisited: item.isVisited,
        }}
        onMarkAsVisited={markVisited}
      />
    );
  };
  return (
    <ScreenSurface>
      <View className=" bg-gray-200">
        <NavigationTopBar title="Historical Places" />

        <View className="mb-44 ">
          {places ? (
            <FlatList
              data={places}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            <Text>No data available</Text>
          )}
        </View>
      </View>
    </ScreenSurface>
  );
}

function useHomeScreen() {
  const { places, setHistoricalPlaces, setPlaces } = useHistoricalPlaces();

  const markVisited = (id: number) => {
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
  return {
    places,
    markVisited,
  };
}
