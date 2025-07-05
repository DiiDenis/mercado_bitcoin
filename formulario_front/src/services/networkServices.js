const BASE_URL = "http://localhost:3000";

export const post = async (endpoint, body = {}, headers = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log("POST error:", response.status, response.statusText);
      const error = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: response.statusText,
        error,
      };
    }

    return await response.json();
  } catch (err) {
    console.error("POST error:", err?.error?.message || err.message);
    throw err;
  }
};
