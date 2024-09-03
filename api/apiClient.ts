// type APIClientOptions = Parameters<typeof window.fetch>;

type ApiClientOptions = Parameters<typeof window.fetch>[1];

export default async function ApiClient(url: string, options: ApiClientOptions) {
  const baseUrl = "https://caavl.com/";
  const fullUrl = baseUrl + url;
  console.log("2", fullUrl);
  const response = await window.fetch(fullUrl, {
    ...options,
    // method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AppApiToken": "ZjN1dEJlcmk4ZjU0amRBWjFORFdFNVBENzlaTWUyVDk=",
      "X-AppType": "doc",
    },
  });
  if (!response.ok) {
    console.log("Error response --", options?.method, fullUrl, response.status);
  }
  //   console.log(response.ok);
  console.log("API request --", fullUrl, options, response.status);

  const responseBody = await response.json();
  //   console.log("API response --", response.json());
  return responseBody;
}
