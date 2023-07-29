-- CreateTable
CREATE TABLE "Prompt" (
    "id" SERIAL NOT NULL,
    "creator_id" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
