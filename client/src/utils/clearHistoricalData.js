export default async function clearHistoricalData() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/history/clear`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error clearing historical data:", error);
    return null;
  }
}
