module.exports = {
  getRoudTrip,
  getOneWayTrip,
  getPricing,
};

async function getRoudTrip(req, res, next) {
  try {
    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      max,
      currencyCode
    } = req.body;
    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&nonStop=false&currencyCode=${currencyCode}&max=${max}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return res.status(200).json(await response.json());
    } else {
      const errorBody = await response.text();
      console.error("Error Response:", errorBody);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch flight offers." });
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

async function getOneWayTrip(req, res, next) {
  try {
    console.log(req.token);
    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults,
      max
    } = req.body;
    console.log(req.body);
    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&max=${max}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return res.status(200).json(await response.json());
    } else {
      const errorBody = await response.text();
      console.error("Error Response:", errorBody);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch flight offers." });
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

async function getPricing(req, res, next) {
  try {
    const url =
      "https://test.api.amadeus.com/v1/shopping/flight-offers/pricing";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${req.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    if (response.ok) {
      return res.status(200).json(await response.json());
    } else {
      const errorBody = await response.text();
      console.error("Error Response:", errorBody);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch flight offers." });
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}
