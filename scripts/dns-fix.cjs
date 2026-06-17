// Force IPv4 + public DNS for OS stub resolver issues with googleads.googleapis.com
const dns = require("dns");
try { dns.setDefaultResultOrder("ipv4first"); } catch {}
const { lookup } = dns;
const resolver = new dns.Resolver();
resolver.setServers(["8.8.8.8", "1.1.1.1"]);
dns.lookup = function (hostname, options, cb) {
  if (typeof options === "function") { cb = options; options = {}; }
  resolver.resolve4(hostname, (err, addrs) => {
    if (!err && addrs && addrs.length) {
      const res = options && options.all ? addrs.map(a => ({ address: a, family: 4 })) : addrs[0];
      return options && options.all ? cb(null, res) : cb(null, addrs[0], 4);
    }
    return lookup.call(dns, hostname, options, cb); // fallback to original
  });
};
