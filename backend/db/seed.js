const prisma = require('./prisma');

async function main() {
      // Example: Create a user
      const photo1 = await prisma.photo.create({
        data: {
          url: '/src/assets/waldo-3-convention.jpeg',
        },
      });

      // Example: Create a post associated with the user
      await prisma.characterCoords.create({
        data: {
          character: 'Waldo',
          xCoord: 405,
          yCoord: 135,
          photoId: photo1.id,
        },
      });

      await prisma.characterCoords.create({
        data: {
          character: 'Wizard',
          xCoord: 661,
          yCoord: 49,
          photoId: photo1.id,
        },
      });

      await prisma.characterCoords.create({
        data: {
          character: 'Wanda',
          xCoord: 287,
          yCoord: 467,
          photoId: photo1.id,
        },
      });

      await prisma.characterCoords.create({
        data: {
          character: 'Odlaw',
          xCoord: 189,
          yCoord: 463,
          photoId: photo1.id,
        },
      });

      console.log('Database seeded successfully!');
}

