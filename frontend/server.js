import server from "live-server"

/**
 * @type import('live-server').LiveServerParams
 */
const params = {
  port: 3000,
  root: "./dist",
  mount: [["/public", "./public/"]],
  open: true,
  wait: 1000,
}

server.start(params)
