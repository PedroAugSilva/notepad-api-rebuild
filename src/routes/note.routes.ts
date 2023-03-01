import { FastifyInstance } from "fastify";
import { ensureAuthenticatedUser } from "../middlewares/ensure-authenticated-user";
import { CreateNoteController } from "../useCases/createNote/create-note-controller";
import { NoteReturnController } from "../useCases/noteReturn/note-return-controller";
import { EditNoteController } from "../useCases/editNote/edit-note-controller";
import { DeleteNoteController } from "../useCases/deleteNote/delete-note-controller";

export const noteRoutes = async (app: FastifyInstance) => {
  const createNoteController = new CreateNoteController();
  const noteReturnController = new NoteReturnController();
  const editNoteControler = new EditNoteController();
  const deleteNoteController = new DeleteNoteController();

  const loadPreHandler = {
    preHandler: ensureAuthenticatedUser,
  };

  app.post("/note/:user_id", loadPreHandler, createNoteController.handle);
  app.get("/note/:user_id", loadPreHandler, noteReturnController.handle);
  app.patch("/note/:id", loadPreHandler, editNoteControler.handle);
  app.delete("/note/:id", loadPreHandler, deleteNoteController.handle);
};
