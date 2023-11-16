export default async function fetchApi() {
    const response = await fetch('https://swapi.dev/api/planets');
    const dataApi = await response.json();
    const newData = dataApi.results;
    return newData;
};
