import fastify from "fastify";
import { noteRoutes } from "./routes/note.routes";
import { userRoutes } from "./routes/user.routes";

const app = fastify();
app.register(userRoutes);
app.register(noteRoutes);
app
  .listen({
    port: 3000,
  })
  .then(() => console.log("server is running in port: 3000"));
