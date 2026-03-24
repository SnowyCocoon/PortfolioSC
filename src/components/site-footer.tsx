export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-6">
        <p className="font-mono text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Dominik Strzalko
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          Built with Next.js
        </p>
      </div>
    </footer>
  );
}
