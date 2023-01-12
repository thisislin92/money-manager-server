const NodeCache = require("node-cache");
// create a cache mechanism, so that we dont always hit CMC api andd reach API limit
// CMC has a limit of 333 request daily, and 10,000 request monthly
const cryptoCache = new NodeCache({ stdTTL: 5, checkperiod: 120 });

const axios = require("axios");

class Controller {
  static async getCryptoPrices(req, res, next) {
    try {
      const cachedResponse = await cryptoCache.get("cmc");

      // if the cache is still exist, then return that cache
      if (cachedResponse) {
        return res.status(200).json(cachedResponse.data);
      }

      // otherwise call CMC api and save it into the cache for future use
      // const config = {
      //   method: "get",
      //   url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD",
      //   headers: {
      //     "X-CMC_PRO_API_KEY": "b1873fa9-5588-482e-bc7c-79d9bb4dabb3",
      //     Accept: "application/json",
      //   },
      // };
      // const response = await axios(config)
      const response = {
        "status": {
          "timestamp": "2023-01-12T00:22:18.177Z",
          "error_code": 0,
          "error_message": null,
          "elapsed": 14,
          "credit_count": 1,
          "notice": null,
          "total_count": 8861
        },
        "data": [
          {
            "id": 1,
            "name": "Bitcoin",
            "symbol": "BTC",
            "slug": "bitcoin",
            "num_market_pairs": 9925,
            "date_added": "2013-04-28T00:00:00.000Z",
            "tags": [
              "mineable",
              "pow",
              "sha-256",
              "store-of-value",
              "state-channel",
              "coinbase-ventures-portfolio",
              "three-arrows-capital-portfolio",
              "polychain-capital-portfolio",
              "binance-labs-portfolio",
              "blockchain-capital-portfolio",
              "boostvc-portfolio",
              "cms-holdings-portfolio",
              "dcg-portfolio",
              "dragonfly-capital-portfolio",
              "electric-capital-portfolio",
              "fabric-ventures-portfolio",
              "framework-ventures-portfolio",
              "galaxy-digital-portfolio",
              "huobi-capital-portfolio",
              "alameda-research-portfolio",
              "a16z-portfolio",
              "1confirmation-portfolio",
              "winklevoss-capital-portfolio",
              "usv-portfolio",
              "placeholder-ventures-portfolio",
              "pantera-capital-portfolio",
              "multicoin-capital-portfolio",
              "paradigm-portfolio"
            ],
            "max_supply": 21000000,
            "circulating_supply": 19259418,
            "total_supply": 19259418,
            "platform": null,
            "cmc_rank": 1,
            "self_reported_circulating_supply": null,
            "self_reported_market_cap": null,
            "tvl_ratio": null,
            "last_updated": "2023-01-12T00:20:00.000Z",
            "quote": {
              "USD": {
                "price": 17932.35890455589,
                "volume_24h": 18749392511.36731,
                "volume_change_24h": 19.006,
                "percent_change_1h": 2.04919789,
                "percent_change_24h": 2.72738805,
                "percent_change_7d": 6.2161787,
                "percent_change_30d": 4.3063417,
                "percent_change_60d": 6.6275951,
                "percent_change_90d": -7.33353672,
                "market_cap": 345366795868.864,
                "market_cap_dominance": 39.2375,
                "fully_diluted_market_cap": 376579536995.67,
                "tvl": null,
                "last_updated": "2023-01-12T00:20:00.000Z"
              }
            }
          },
          {
            "id": 1027,
            "name": "Ethereum",
            "symbol": "ETH",
            "slug": "ethereum",
            "num_market_pairs": 6347,
            "date_added": "2015-08-07T00:00:00.000Z",
            "tags": [
              "pos",
              "smart-contracts",
              "ethereum-ecosystem",
              "coinbase-ventures-portfolio",
              "three-arrows-capital-portfolio",
              "polychain-capital-portfolio",
              "binance-labs-portfolio",
              "blockchain-capital-portfolio",
              "boostvc-portfolio",
              "cms-holdings-portfolio",
              "dcg-portfolio",
              "dragonfly-capital-portfolio",
              "electric-capital-portfolio",
              "fabric-ventures-portfolio",
              "framework-ventures-portfolio",
              "hashkey-capital-portfolio",
              "kenetic-capital-portfolio",
              "huobi-capital-portfolio",
              "alameda-research-portfolio",
              "a16z-portfolio",
              "1confirmation-portfolio",
              "winklevoss-capital-portfolio",
              "usv-portfolio",
              "placeholder-ventures-portfolio",
              "pantera-capital-portfolio",
              "multicoin-capital-portfolio",
              "paradigm-portfolio",
              "injective-ecosystem"
            ],
            "max_supply": null,
            "circulating_supply": 122373866.2178,
            "total_supply": 122373866.2178,
            "platform": null,
            "cmc_rank": 2,
            "self_reported_circulating_supply": null,
            "self_reported_market_cap": null,
            "tvl_ratio": null,
            "last_updated": "2023-01-12T00:20:00.000Z",
            "quote": {
              "USD": {
                "price": 1387.3074912773282,
                "volume_24h": 6452874000.598131,
                "volume_change_24h": 10.6153,
                "percent_change_1h": 2.4683262,
                "percent_change_24h": 3.72497919,
                "percent_change_7d": 10.23536049,
                "percent_change_30d": 8.89735818,
                "percent_change_60d": 10.28294374,
                "percent_change_90d": 7.92990254,
                "market_cap": 169770181340.5235,
                "market_cap_dominance": 19.2834,
                "fully_diluted_market_cap": 169770181340.52,
                "tvl": null,
                "last_updated": "2023-01-12T00:20:00.000Z"
              }
            }
          },
          {
            "id": 825,
            "name": "Tether",
            "symbol": "USDT",
            "slug": "tether",
            "num_market_pairs": 46018,
            "date_added": "2015-02-25T00:00:00.000Z",
            "tags": [
              "payments",
              "stablecoin",
              "asset-backed-stablecoin",
              "avalanche-ecosystem",
              "solana-ecosystem",
              "arbitrum-ecosytem",
              "moonriver-ecosystem",
              "injective-ecosystem",
              "bnb-chain",
              "usd-stablecoin"
            ],
            "max_supply": null,
            "circulating_supply": 66272586561.09695,
            "total_supply": 73141766321.23428,
            "platform": {
              "id": 1027,
              "name": "Ethereum",
              "symbol": "ETH",
              "slug": "ethereum",
              "token_address": "0xdac17f958d2ee523a2206206994597c13d831ec7"
            },
            "cmc_rank": 3,
            "self_reported_circulating_supply": null,
            "self_reported_market_cap": null,
            "tvl_ratio": null,
            "last_updated": "2023-01-12T00:20:00.000Z",
            "quote": {
              "USD": {
                "price": 0.999991770408428,
                "volume_24h": 26063067457.93389,
                "volume_change_24h": 9.5719,
                "percent_change_1h": -0.00014842,
                "percent_change_24h": -0.01024134,
                "percent_change_7d": 0.02425664,
                "percent_change_30d": -0.01290816,
                "percent_change_60d": 0.14593905,
                "percent_change_90d": -0.00704962,
                "market_cap": 66272041164.77713,
                "market_cap_dominance": 7.5298,
                "fully_diluted_market_cap": 73141164394.37,
                "tvl": null,
                "last_updated": "2023-01-12T00:20:00.000Z"
              }
            }
          },
          {
            "id": 1839,
            "name": "BNB",
            "symbol": "BNB",
            "slug": "bnb",
            "num_market_pairs": 1165,
            "date_added": "2017-07-25T00:00:00.000Z",
            "tags": [
              "marketplace",
              "centralized-exchange",
              "payments",
              "smart-contracts",
              "alameda-research-portfolio",
              "multicoin-capital-portfolio",
              "bnb-chain"
            ],
            "max_supply": 200000000,
            "circulating_supply": 159962766.42583674,
            "total_supply": 159979963.59042934,
            "platform": null,
            "cmc_rank": 4,
            "self_reported_circulating_supply": null,
            "self_reported_market_cap": null,
            "tvl_ratio": null,
            "last_updated": "2023-01-12T00:20:00.000Z",
            "quote": {
              "USD": {
                "price": 284.55827854726067,
                "volume_24h": 472972664.50906813,
                "volume_change_24h": 1.3961,
                "percent_change_1h": 1.18640009,
                "percent_change_24h": 2.50538549,
                "percent_change_7d": 9.9213015,
                "percent_change_30d": 3.02646162,
                "percent_change_60d": 0.63345294,
                "percent_change_90d": 4.67593553,
                "market_cap": 45518729445.79365,
                "market_cap_dominance": 5.1718,
                "fully_diluted_market_cap": 56911655709.45,
                "tvl": null,
                "last_updated": "2023-01-12T00:20:00.000Z"
              }
            }
          },
          {
            "id": 3408,
            "name": "USD Coin",
            "symbol": "USDC",
            "slug": "usd-coin",
            "num_market_pairs": 9474,
            "date_added": "2018-10-08T00:00:00.000Z",
            "tags": [
              "medium-of-exchange",
              "stablecoin",
              "asset-backed-stablecoin",
              "fantom-ecosystem",
              "arbitrum-ecosytem",
              "moonriver-ecosystem",
              "bnb-chain",
              "usd-stablecoin"
            ],
            "max_supply": null,
            "circulating_supply": 43890615187.467575,
            "total_supply": 43890615187.467575,
            "platform": {
              "id": 1027,
              "name": "Ethereum",
              "symbol": "ETH",
              "slug": "ethereum",
              "token_address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            },
            "cmc_rank": 5,
            "self_reported_circulating_supply": null,
            "self_reported_market_cap": null,
            "tvl_ratio": null,
            "last_updated": "2023-01-12T00:20:00.000Z",
            "quote": {
              "USD": {
                "price": 1.0000951111473153,
                "volume_24h": 2851297199.295648,
                "volume_change_24h": 8.127,
                "percent_change_1h": -0.01397627,
                "percent_change_24h": 0.00136093,
                "percent_change_7d": 0.00465024,
                "percent_change_30d": 0.01022488,
                "percent_change_60d": -0.04167108,
                "percent_change_90d": 0.00676686,
                "market_cap": 43894789674.23443,
                "market_cap_dominance": 4.984,
                "fully_diluted_market_cap": 43894789674.23,
                "tvl": null,
                "last_updated": "2023-01-12T00:20:00.000Z"
              }
            }
          },
          {
            "id": 52,
            "name": "XRP",
            "symbol": "XRP",
            "slug": "xrp",
            "num_market_pairs": 874,
            "date_added": "2013-08-04T00:00:00.000Z",
            "tags": [
              "medium-of-exchange",
              "enterprise-solutions",
              "arrington-xrp-capital-portfolio",
              "galaxy-digital-portfolio",
              "a16z-portfolio",
              "pantera-capital-portfolio"
            ],
            "max_supply": 100000000000,
            "circulating_supply": 50623288122,
            "total_supply": 99989164463,
            "platform": null,
            "cmc_rank": 6,
            "self_reported_circulating_supply": null,
            "self_reported_market_cap": null,
            "tvl_ratio": null,
            "last_updated": "2023-01-12T00:20:00.000Z",
            "quote": {
              "USD": {
                "price": 0.3722254531469821,
                "volume_24h": 1514094933.598924,
                "volume_change_24h": 85.7358,
                "percent_change_1h": 0.24109033,
                "percent_change_24h": 5.94748635,
                "percent_change_7d": 6.90437247,
                "percent_change_30d": -3.71724267,
                "percent_change_60d": 1.93765337,
                "percent_change_90d": -22.3473317,
                "market_cap": 18843276361.001686,
                "market_cap_dominance": 2.1396,
                "fully_diluted_market_cap": 37222545314.7,
                "tvl": null,
                "last_updated": "2023-01-12T00:20:00.000Z"
              }
            }
          },
          {
            "id": 4687,
            "name": "Binance USD",
            "symbol": "BUSD",
            "slug": "binance-usd",
            "num_market_pairs": 5987,
            "date_added": "2019-09-20T00:00:00.000Z",
            "tags": [
              "stablecoin",
              "asset-backed-stablecoin",
              "binance-chain",
              "harmony-ecosystem",
              "moonriver-ecosystem",
              "usd-stablecoin"
            ],
            "max_supply": null,
            "circulating_supply": 16389683642.974058,
            "total_supply": 16389683642.974058,
            "platform": {
              "id": 1839,
              "name": "BNB",
              "symbol": "BNB",
              "slug": "bnb",
              "token_address": "BUSD-BD1"
            },
            "cmc_rank": 7,
            "self_reported_circulating_supply": null,
            "self_reported_market_cap": null,
            "tvl_ratio": null,
            "last_updated": "2023-01-12T00:20:00.000Z",
            "quote": {
              "USD": {
                "price": 1.0002660197587356,
                "volume_24h": 6637819891.9045925,
                "volume_change_24h": 16.3946,
                "percent_change_1h": -0.05622609,
                "percent_change_24h": 0.01228068,
                "percent_change_7d": 0.04774559,
                "percent_change_30d": 0.03385397,
                "percent_change_60d": -0.0880855,
                "percent_change_90d": -0.00486481,
                "market_cap": 16394043622.662516,
                "market_cap_dominance": 1.8627,
                "fully_diluted_market_cap": 16394043622.66,
                "tvl": null,
                "last_updated": "2023-01-12T00:20:00.000Z"
              }
            }
          },
          {
            "id": 2010,
            "name": "Cardano",
            "symbol": "ADA",
            "slug": "cardano",
            "num_market_pairs": 634,
            "date_added": "2017-10-01T00:00:00.000Z",
            "tags": [
              "dpos",
              "pos",
              "platform",
              "research",
              "smart-contracts",
              "staking",
              "cardano-ecosystem",
              "cardano"
            ],
            "max_supply": 45000000000,
            "circulating_supply": 34518639816.743,
            "total_supply": 35285627462.326,
            "platform": null,
            "cmc_rank": 8,
            "self_reported_circulating_supply": null,
            "self_reported_market_cap": null,
            "tvl_ratio": null,
            "last_updated": "2023-01-12T00:20:00.000Z",
            "quote": {
              "USD": {
                "price": 0.3218665930983499,
                "volume_24h": 331703530.1610675,
                "volume_change_24h": -19.0918,
                "percent_change_1h": 1.47445234,
                "percent_change_24h": -0.08701337,
                "percent_change_7d": 19.97256,
                "percent_change_30d": 4.89186295,
                "percent_change_60d": -5.43291418,
                "percent_change_90d": -14.55064531,
                "market_cap": 11110396996.204119,
                "market_cap_dominance": 1.262,
                "fully_diluted_market_cap": 14483996689.43,
                "tvl": null,
                "last_updated": "2023-01-12T00:20:00.000Z"
              }
            }
          },
          {
            "id": 74,
            "name": "Dogecoin",
            "symbol": "DOGE",
            "slug": "dogecoin",
            "num_market_pairs": 632,
            "date_added": "2013-12-15T00:00:00.000Z",
            "tags": [
              "mineable",
              "pow",
              "scrypt",
              "medium-of-exchange",
              "memes",
              "payments",
              "doggone-doggerel",
              "bnb-chain"
            ],
            "max_supply": null,
            "circulating_supply": 132670764299.89409,
            "total_supply": 132670764299.89409,
            "platform": null,
            "cmc_rank": 9,
            "self_reported_circulating_supply": null,
            "self_reported_market_cap": null,
            "tvl_ratio": null,
            "last_updated": "2023-01-12T00:20:00.000Z",
            "quote": {
              "USD": {
                "price": 0.07799646688823925,
                "volume_24h": 398161871.2414684,
                "volume_change_24h": -18.9039,
                "percent_change_1h": 0.88532519,
                "percent_change_24h": 0.48219316,
                "percent_change_7d": 5.46963926,
                "percent_change_30d": -14.31568341,
                "percent_change_60d": -11.94297749,
                "percent_change_90d": 30.9444386,
                "market_cap": 10347850874.754084,
                "market_cap_dominance": 1.1757,
                "fully_diluted_market_cap": 10347850874.75,
                "tvl": null,
                "last_updated": "2023-01-12T00:20:00.000Z"
              }
            }
          },
          {
            "id": 3890,
            "name": "Polygon",
            "symbol": "MATIC",
            "slug": "polygon",
            "num_market_pairs": 568,
            "date_added": "2019-04-28T00:00:00.000Z",
            "tags": [
              "platform",
              "enterprise-solutions",
              "scaling",
              "state-channel",
              "coinbase-ventures-portfolio",
              "binance-launchpad",
              "binance-labs-portfolio",
              "polygon-ecosystem",
              "moonriver-ecosystem",
              "injective-ecosystem"
            ],
            "max_supply": 10000000000,
            "circulating_supply": 8734317475.28493,
            "total_supply": 10000000000,
            "platform": null,
            "cmc_rank": 10,
            "self_reported_circulating_supply": null,
            "self_reported_market_cap": null,
            "tvl_ratio": null,
            "last_updated": "2023-01-12T00:20:00.000Z",
            "quote": {
              "USD": {
                "price": 0.8892648735862858,
                "volume_24h": 313592311.1503709,
                "volume_change_24h": 26.1164,
                "percent_change_1h": 1.05775444,
                "percent_change_24h": 3.57326783,
                "percent_change_7d": 9.8904045,
                "percent_change_30d": -2.29361596,
                "percent_change_60d": -6.17110784,
                "percent_change_90d": 14.55851738,
                "market_cap": 7767121725.52174,
                "market_cap_dominance": 0.8825,
                "fully_diluted_market_cap": 8892648735.86,
                "tvl": null,
                "last_updated": "2023-01-12T00:20:00.000Z"
              }
            }
          }
        ]
      }
      cryptoCache.set("cmc", response);

      // cryptoCache.set("cmc", response.data);
      res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
