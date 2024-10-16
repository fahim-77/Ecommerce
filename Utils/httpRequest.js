const BASE_URL = "https://fakestoreapi.com";
export async function fetchURL(path, method, body) {
  try {
    const request = await fetch(`${BASE_URL}/${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body && { body: JSON.stringify(body) }),
    });
    if (request.ok) {
      const result = await request.json();
      return { data: result };
    } else {
      throw new Error("Bad request");
    }
  } catch (error) {
    return { error: error.message };
  }
}
