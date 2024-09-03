import { Place } from "@Screens/HistoricalPlacesStack/HomeScreen";
import constate from "constate";
import { useEffect, useState } from "react";

export const [HistoricalPlacesProvider, useHistoricalPlaces] = constate(() => {
  const [places, setPlaces] = useState<undefined | Place[]>(undefined);
  const [visitedPlaces, setVisitedPlaces] = useState<undefined | {}>(undefined);

  const setHistoricalPlaces = (fetchedPlaces: any) => {
    const places = fetchedPlaces?.map((place: Place) => {
      return {
        id: place.id,
        title: place.title,
        description: place.description.substring(0, 50) + "...",
        image: place.image,
        isVisited: false,
      };
    });

    setPlaces(places);
  };

  return {
    places,
    visitedPlaces,
    setHistoricalPlaces,
    setVisitedPlaces,
    setPlaces,
  };
});
