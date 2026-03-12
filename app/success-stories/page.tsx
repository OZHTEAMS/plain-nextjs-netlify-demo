import { getSuccessStories } from "@/app/actions";
import SuccessStoriesGrid from "./SuccessStoriesGrid";

export const dynamic = "force-dynamic";

export default async function SuccessStoriesPage() {
  const stories = await getSuccessStories();

  return (
    <div className="min-h-screen bg-[#0F1F38] px-6 py-16">
      <section className="max-w-6xl mx-auto">
        <span className="text-[#C9A84C] text-xs uppercase tracking-[0.25em] font-bold">
          Venezolanos en el Mundo
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-4">
          Historias de Exito Global
        </h1>
        <p className="text-slate-400 max-w-2xl mb-12">
          Emprendedores, ejecutivos y lideres venezolanos que estan construyendo
          impacto internacional.
        </p>

        <SuccessStoriesGrid stories={stories} />
      </section>
    </div>
  );
}
