export default class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    // ...
  }

  // other methods for working with the API
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "40adfe4e-c0e4-40a1-9506-b555db893f72",
    "Content-Type": "application/json",
  },
});

// submit -- onload = button.textContent = "Saving..."
