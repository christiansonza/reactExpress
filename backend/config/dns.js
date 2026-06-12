import dns from "dns";

export const fixDNS = () => {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
};