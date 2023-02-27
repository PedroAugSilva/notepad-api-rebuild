import fastify from "fastify";
import { serverRoutes } from "./server.routes";

const app = fastify();
app.register(serverRoutes);
app
  .listen({
    port: 3000,
  })
  .then(() => console.log("server is running in port: 3000"));
