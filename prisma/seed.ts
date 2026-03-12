import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.successStory.createMany({
    skipDuplicates: true,
    data: [
      {
        nombre: 'Daniela Rivas',
        bio: 'Fundadora de una startup fintech en Madrid enfocada en pagos transfronterizos para latinoamericanos.',
        categoria: 'Tecnologia',
        linkedin_url: 'https://www.linkedin.com/in/daniela-rivas',
        image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
      },
      {
        nombre: 'Luis Andrade',
        bio: 'Director de operaciones en una firma de inversion en Miami con foco en mercados emergentes.',
        categoria: 'Finanzas',
        linkedin_url: 'https://www.linkedin.com/in/luis-andrade',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
      },
      {
        nombre: 'Carla Mendez',
        bio: 'Economista y conferencista en Bogota, asesora a pymes venezolanas para expandirse en la region andina.',
        categoria: 'Economia',
        linkedin_url: 'https://www.linkedin.com/in/carla-mendez',
        image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  });

  await prisma.post.createMany({
    skipDuplicates: true,
    data: [
      {
        title: '¿Por qué el dólar paralelo sube cada vez más rápido?',
        content: 'La brecha entre el dólar BCV y el paralelo refleja la pérdida de confianza en la moneda nacional. En este análisis exploramos los factores macroeconómicos que impulsan esta dinámica y cómo proteger tu patrimonio.',
        category: 'Economía',
        slug: 'dolar-paralelo-sube-rapido',
        published: true,
      },
      {
        title: 'Cómo invertir en Bitcoin desde Venezuela en 2026',
        content: 'A pesar de las restricciones, millones de venezolanos usan criptomonedas para dolarizar sus ahorros. Te explicamos los pasos concretos, plataformas disponibles y riesgos a considerar.',
        category: 'Inversión',
        slug: 'invertir-bitcoin-venezuela-2026',
        published: true,
      },
      {
        title: 'Las mejores plataformas P2P para cambiar bolívares a dólares',
        content: 'Reserve, Binance P2P y LocalBitcoins son las más usadas. Comparamos comisiones, velocidad y seguridad para que elijas la que mejor se adapta a tu situación.',
        category: 'Divisas',
        slug: 'mejores-plataformas-p2p-bolivares-dolares',
        published: true,
      },
      {
        title: 'Inflación en Venezuela: ¿Qué esperar para el cierre de 2026?',
        content: 'El FMI proyecta una inflación de tres dígitos para Venezuela. Analizamos los indicadores clave y qué sectores se verán más afectados.',
        category: 'Noticias',
        slug: 'inflacion-venezuela-cierre-2026',
        published: true,
      },
      {
        title: 'USDT Tether: la moneda estable favorita de los venezolanos',
        content: 'Más del 60% de las transacciones cripto en Venezuela se realizan en USDT. Te explicamos por qué es la opción preferida y cómo usarla de forma segura.',
        category: 'Criptomonedas',
        slug: 'usdt-tether-moneda-venezolanos',
        published: true,
      },
    ],
  });

  console.log('Seeding completado: posts y success stories creados.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
