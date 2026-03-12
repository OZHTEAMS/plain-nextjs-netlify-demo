"use client";

import { motion } from "framer-motion";

type Story = {
  id: string;
  nombre: string;
  bio: string;
  categoria: string;
  linkedin_url: string | null;
  image_url: string | null;
};

export default function SuccessStoriesGrid({ stories }: { stories: Story[] }) {
  if (stories.length === 0) {
    return (
      <p className="text-slate-400 text-center py-20">
        Aun no hay historias publicadas.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stories.map((story, index) => (
        <motion.article
          key={story.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
          className="bg-[#1B2D3F] border border-white/5 rounded-2xl overflow-hidden shadow-xl shadow-black/20"
        >
          <div className="aspect-[4/3] bg-[#122235]">
            {story.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={story.image_url}
                alt={story.nombre}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full grid place-content-center text-[#C9A84C] text-sm">
                Sin imagen
              </div>
            )}
          </div>

          <div className="p-5 space-y-3">
            <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-bold">
              {story.categoria}
            </span>
            <h3 className="text-white text-xl font-extrabold">{story.nombre}</h3>
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">{story.bio}</p>
            {story.linkedin_url && (
              <a
                href={story.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A84C] text-xs font-semibold hover:underline"
              >
                Ver perfil en LinkedIn {"->"}
              </a>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
