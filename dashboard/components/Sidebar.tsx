"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Performance", icon: "📊", desc: "Métricas e campanhas" },
  { href: "/studio", label: "Estúdio", icon: "🎨", desc: "Criar criativos" },
  { href: "/campaigns", label: "Campanhas", icon: "🚀", desc: "Criar anúncios" },
  { href: "/catalog", label: "Catálogo", icon: "👕", desc: "Estampas e produtos" },
  { href: "/assistant", label: "Assistente", icon: "🤖", desc: "Decisões semanais" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col py-6 px-4 shrink-0">
      {/* Logo */}
      <div className="mb-8 px-2">
        <h1 className="text-lg font-bold tracking-tight">Le Mott</h1>
        <p className="text-zinc-500 text-xs mt-0.5">feita de alma, feita de mots.</p>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-1 flex-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                active
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <div>
                <p className="text-sm font-medium leading-none">{link.label}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{link.desc}</p>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Status do token */}
      <div className="mt-6 px-3 py-3 rounded-lg bg-zinc-800 border border-zinc-700">
        <p className="text-xs text-zinc-400 font-medium mb-1">Status Meta</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
          <span className="text-xs text-yellow-400">Token pendente</span>
        </div>
      </div>
    </aside>
  );
}
