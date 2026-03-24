import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 font-sans">
        <p className="text-muted-foreground">Página não encontrada.</p>
        <Link href="/" className="text-sm underline underline-offset-4">
          Início
        </Link>
      </body>
    </html>
  );
}
