-- CreateTable
CREATE TABLE "public"."Photo" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "url" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CharacterCoords" (
    "id" SERIAL NOT NULL,
    "character" TEXT NOT NULL,
    "xCoord" INTEGER NOT NULL,
    "yCoord" INTEGER NOT NULL,
    "photoId" INTEGER NOT NULL,

    CONSTRAINT "CharacterCoords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Highscore" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Highscore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Highscore_username_key" ON "public"."Highscore"("username");

-- AddForeignKey
ALTER TABLE "public"."CharacterCoords" ADD CONSTRAINT "CharacterCoords_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "public"."Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
