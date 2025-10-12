export default async function getData() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/data`);
    if (res.status == 200) {
      const data = await res.json();
      return data;
    }
    return false;
  } catch (error) {
    console.log("Error while fetching data", error);
    return false;
  }
}
