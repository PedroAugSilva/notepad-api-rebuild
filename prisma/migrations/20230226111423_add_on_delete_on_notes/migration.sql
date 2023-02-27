-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_notes" ("content", "id", "title", "user_id") SELECT "content", "id", "title", "user_id" FROM "notes";
DROP TABLE "notes";
ALTER TABLE "new_notes" RENAME TO "notes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
