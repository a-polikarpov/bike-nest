const isPortReachable = require('is-port-reachable');

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const getRandomPort = (ports) => {
  const randomIdx = randomInteger(0, ports.length - 1);
  return ports[randomIdx];
};


const getFreePort = async (ports) => {
  const randomPort = getRandomPort(ports);
  const isFree = !(await isPortReachable(randomPort, {host: 'localhost'}));
  return isFree ? randomPort : getFreePort();
};

module.exports = {
  getFreePort
};