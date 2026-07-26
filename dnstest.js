const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);


const dns = require("dns").promises;

(async () => {
  try {
    const result = await dns.resolveSrv("_mongodb._tcp.cluster0.m02tarp.mongodb.net");
    console.log(result);
  } catch (err) {
    console.error(err);
  }
})();