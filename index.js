const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const axios = require("axios");
const cors = require("cors");

// Create Express Server
const app = express();

// Configuration
const PORT = 3420;
const HOST = "localhost";
const SLP_URL = "https://axiesworld.firebaseapp.com/updateSpecific";
const MMR_URL = "https://axie-proxy.secret-shop.buzz/_basicStats";
const AXIES_URL = "https://axie-proxy.secret-shop.buzz/_axiesPlease";
const AXIE_DETAIL_URL = "https://api.axie.technology/getgenes";

// Logging
app.use(morgan("dev"), cors());

// GET SLP DATA
app.get("/slp", async (req, res, next) => {
  const slpData = await axios.get(SLP_URL, {
    params: req.query,
  });

  console.log(slpData.data);

  res.status(slpData.status).send(JSON.stringify(slpData.data));
});

// GET MMR DATA
app.get("/mmr", async (req, res, next) => {
  const mmrData = await axios.get(`${MMR_URL}/${req.query.address}`);

  res.status(mmrData.status).send(JSON.stringify(mmrData.data));
});

// GET AXIES DATA
app.get("/axies", async (req, res, next) => {
  const axiesData = await axios.get(`${AXIES_URL}/${req.query.address}`);

  res.status(axiesData.status).send(JSON.stringify(axiesData.data));
});

// GET AXIE DATAIL
app.get("/axie-detail", async (req, res, next) => {
  const axieDetail = await axios.get(`${AXIE_DETAIL_URL}/${req.query.id}`);

  res.status(axieDetail.status).send(JSON.stringify(axieDetail.data));
});

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
