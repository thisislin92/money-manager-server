const NodeCache = require("node-cache");
// create a cache mechanism, so that we dont always hit CMC api andd reach API limit
// CMC has a limit of 333 request daily, and 10,000 request monthly
const cryptoCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

const axios = require("axios");

class Controller {
  static async getCryptoPrices(req, res, next) {
    try {
      const cachedResponse = await cryptoCache.get("cmc");

      // if the cache is still exist, then return that cache
      if (cachedResponse) {
        return res.status(200).json(cachedResponse);
      }

      // otherwise call CMC api and save it into the cache for future use
      const config = {
        method: "get",
        url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD",
        headers: {
          "X-CMC_PRO_API_KEY": "b1873fa9-5588-482e-bc7c-79d9bb4dabb3",
          Accept: "application/json",
        },
      };
      const response = await axios(config)

      cryptoCache.set("cmc", response.data);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
