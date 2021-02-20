import server from "live-server"

/**
 * @type import('live-server').LiveServerParams
 */
const params = {
  port: 3000,
  root: "./dist",
  open: true,
  wait: 1000,
}

server.start(params)
