import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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

  console.log('Seeding completado: 5 artículos de Venezuelan Wealth creados.');
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
