import { Place } from "@Screens/HistoricalPlacesStack/HomeScreen";
import constate from "constate";
import { useEffect, useState } from "react";

export const [HistoricalPlacesProvider, useHistoricalPlaces] = constate(() => {
  const [places, setPlaces] = useState<undefined | Place[]>(undefined);
  const [visitedPlaces, setVisitedPlaces] = useState<undefined | {}>(undefined);

  const setHistoricalPlaces = (fetchedPlaces: any) => {
    const places = fetchedPlaces?.map((place: Place, index: number) => {
      return {
        id: place.id,
        title: place.title,
        description: place.description.substring(0, 50) + "...",
        image: getImageUri(index),
        isVisited: false,
      };
    });

    setPlaces(places);
  };
  //we are implementing this because the api not returning images
  const getImageUri = (index: number): string => {
    const calc = index % 3;
    console.log("-=---calc", calc);
    if (calc === 0) {
      return "https://caavl.com/storage/files/lk/3165/8c1424a7f51ea08907e1f76850d0d537.jpg";
    }
    if (calc === 1) {
      return "https://caavl.com/storage/files/lk/3047/f3266c8b5ca3f80b900852b23c6a5ed9.png";
    }

    return "https://caavl.com/storage/files/lk/3150/5584c16c45cada887b07e0475e843274.jpg";
  };

  return {
    places,
    visitedPlaces,
    setHistoricalPlaces,
    setVisitedPlaces,
    setPlaces,
  };
});
