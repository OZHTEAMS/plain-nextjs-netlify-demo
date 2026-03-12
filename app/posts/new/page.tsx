export const dynamic = "force-dynamic";

import Form from "next/form";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function NewPost() {
  async function createPost(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const rawSlug = formData.get("slug") as string;
    // Sanitize slug: lowercase, replace spaces/special chars with hyphens
    const slug = rawSlug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\-]/g, "-")
      .replace(/-+/g, "-");

    await prisma.post.create({
      data: { title, content, category, slug, published: true },
    });

    revalidatePath("/");
    redirect("/");
  }

  const inputClass =
    "w-full px-4 py-2 bg-[#0F1F38] border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#C9A84C]";
  const labelClass = "block text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-[#0F1F38] py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-2">
          Nuevo <span className="text-[#C9A84C]">Artículo</span>
        </h1>
        <p className="text-slate-400 mb-10 text-sm">
          Publica contenido de inteligencia financiera.
        </p>

        <Form action={createPost} className="space-y-6">
          <div>
            <label htmlFor="title" className={labelClass}>
              Título <span className="text-[#C9A84C]">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Ej: Cómo invertir en dólares desde Venezuela"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="category" className={labelClass}>
              Categoría <span className="text-[#C9A84C]">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              className={inputClass}
            >
              <option value="">Selecciona una categoría</option>
              <option value="Economía">Economía</option>
              <option value="Inversión">Inversión</option>
              <option value="Noticias">Noticias</option>
              <option value="Criptomonedas">Criptomonedas</option>
              <option value="Divisas">Divisas</option>
            </select>
          </div>

          <div>
            <label htmlFor="slug" className={labelClass}>
              Slug (URL) <span className="text-[#C9A84C]">*</span>
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              placeholder="ej: como-invertir-en-dolares"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="content" className={labelClass}>
              Contenido
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Escribe el contenido del artículo aquí..."
              rows={8}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#C9A84C] text-[#0A1628] py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
          >
            Publicar Artículo
          </button>
        </Form>
      </div>
    </div>
  );
}
