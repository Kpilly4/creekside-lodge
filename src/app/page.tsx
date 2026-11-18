import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="page-gutter flex items-center justify-between gap-6 border-b border-border py-7 sm:py-9">
        <a href="/" aria-label="Creekside Lodge home" className="inline-flex shrink-0">
          <Image
            src="/images/creekside-mark.png"
            alt="Creekside Lodge"
            width={1637}
            height={960}
            className="h-auto w-28 sm:w-32"
            priority
          />
        </a>
        <span className="eyebrow hidden text-muted-foreground sm:block">
          A place to slow down
        </span>
      </header>

      <main id="main" className="page-gutter flex flex-1 items-center justify-center py-24 sm:py-32">
        <section aria-labelledby="welcome-heading" className="mx-auto max-w-5xl text-center">
          <p className="eyebrow mb-9 text-primary">Welcome to Creekside</p>
          <h1 id="welcome-heading" className="display-heading">
            A slower pace.
            <br />
            <span className="italic text-primary">A place to settle in.</span>
          </h1>
          <div aria-hidden="true" className="mx-auto my-10 h-12 w-px bg-border" />
          <p className="mx-auto max-w-md text-sm leading-8 text-muted-foreground sm:text-base">
            Take a breath. Leave the everyday behind.
            <br />
            Make yourself at home.
          </p>
        </section>
      </main>

      <footer className="page-gutter flex flex-col gap-4 border-t border-footer-foreground/15 bg-footer py-6 text-center text-footer-foreground sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="eyebrow">Creekside Lodge</p>
        <p className="text-xs tracking-wide text-footer-foreground/75">
          A little closer to nature.
        </p>
      </footer>
    </div>
  );
}
