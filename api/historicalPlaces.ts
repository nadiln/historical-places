import ApiClient from "./apiClient";

const fetchHistoricalPlaces = async () => {
  try {
    const response = await ApiClient("api/posts?op=latest&perPage=5", {
      method: "GET",
    });
    // console.log("reee ", response.result.data);
    return response?.result?.data;
  } catch (error) {
    console.error(["Error fetching historical places", error]);
  }
};

const fetchVisitedPlaces = async () => {};

export { fetchHistoricalPlaces, fetchVisitedPlaces };
