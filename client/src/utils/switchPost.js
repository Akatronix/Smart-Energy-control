export default async function UpdateSwitch(updateFields) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/relay/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateFields),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating data:", error);
    return null;
  }
}
