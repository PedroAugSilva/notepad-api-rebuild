import { FastifyInstance } from "fastify";
import { ensureAuthenticatedUser } from "../middlewares/ensure-authenticated-user";
import { CreateNoteController } from "../useCases/createNote/create-note-controller";
import { NoteReturnController } from "../useCases/noteReturn/note-return-controller";

export const noteRoutes = async (app: FastifyInstance) => {
  const createNoteController = new CreateNoteController();
  const noteReturnController = new NoteReturnController();

  app.post(
    "/note/:user_id",
    { preHandler: ensureAuthenticatedUser },
    createNoteController.handle
  );
  app.get(
    "/note/:user_id",
    { preHandler: ensureAuthenticatedUser },
    noteReturnController.handle
  );
};
