const handleConfirm = async ({ ssid, password }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/hotspot/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "68f6e4c40d3af76a142703c0",
        ssid,
        password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export default handleConfirm;
