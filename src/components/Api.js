export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    this._contentType = headers.contentType;
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: this._authorization,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  }
  catch(err) {
    console.error("I got an error:", err.message);
    throw err;
  }

  // other methods for working with the API
}

// submit -- onload = button.textContent = "Saving..."
