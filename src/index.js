const { send, buffer } = require("micro");
const axios = require("axios");
const fs = require("fs");
const { router, get } = require("microrouter");
require("dotenv-safe").config();

const rootRoute = async (req, res) =>
  send(
    res,
    404,
    await Promise.resolve(
      "Please use this path format to get your badges: /@spscommerce/packagename"
    )
  );
const notFoundRoute = async (req, res) =>
  send(res, 404, await Promise.resolve("Not found route"));

const badgeRoute = async (req, res) => {
  if (req.url === "/favicon.ico") {
    send(res, 404, await Promise.resolve("Favicon not available."));
    return;
  }
  const packageName = req.url.substring(1);

  const versionRequestUrl = `${
    process.env.ARTIFACTORY_BADGE_URI
  }${encodeURIComponent(packageName)}`;
  const versionRequestConfig = {
    auth: {
      username: process.env.ARTIFACTORY_BADGE_USERNAME,
      password: process.env.ARTIFACTORY_BADGE_PASSWORD
    }
  };

  const versionRequest = await axios.get(
    versionRequestUrl,
    versionRequestConfig
  );

  const tags = versionRequest.data["dist-tags"];

  if (!tags) {
    send(
      res,
      404,
      "Could not determine latest version for package " + packageName
    );
    return;
  }
  const latestDistVersion = tags.latest;
  console.log(latestDistVersion);
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Pragma","no-cache");
  
  const version = latestDistVersion.replace(/-/gi, "--");
  const imageUrl = `https://img.shields.io/badge/version-${version}-green.svg?style=flat-square`;
  const img = await axios.get(imageUrl);
  send(res, 200, await Promise.resolve(img.data));
  return;
};

module.exports = router(
  get("/:scope/:package", badgeRoute),
  get("/:scope", badgeRoute),
  get("/", rootRoute),
  get("/*", notFoundRoute)
);
