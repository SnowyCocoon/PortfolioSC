import { cn } from "@/lib/utils";

interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function Panel({ children, className, ...props }: PanelProps) {
  return (
    <section
      className={cn("screen-line-top screen-line-bottom border-x border-line", className)}
      {...props}
    >
      {children}
    </section>
  );
}

export function PanelHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("screen-line-bottom px-4 py-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function PanelTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("font-mono text-xl font-bold", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export function PanelTitleSup({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <sup
      className={cn("ml-1 font-mono text-sm text-muted-foreground", className)}
      {...props}
    >
      ({children})
    </sup>
  );
}

export function PanelContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-4 py-4", className)} {...props}>
      {children}
    </div>
  );
}
