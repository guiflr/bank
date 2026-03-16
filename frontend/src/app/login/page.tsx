export default function Login() {
  return (
    <main className="grid min-h-screen w-full place-items-center px-6 py-12">
      <section className="w-full max-w-md border-2 border-black bg-white p-8 dark:border-white dark:bg-black">
        <form className="grid gap-5">
          <label className="grid gap-2 text-xs uppercase tracking-[0.2em]">
            Username
            <input
              name="username"
              type="text"
              autoComplete="username"
              className="border border-black bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white dark:border-white dark:focus:ring-white dark:focus:ring-offset-black"
            />
          </label>

          <label className="grid gap-2 text-xs uppercase tracking-[0.2em]">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="border border-black bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white dark:border-white dark:focus:ring-white dark:focus:ring-offset-black"
            />
          </label>

          <button
            type="submit"
            className="mt-2 border border-black bg-black px-4 py-2 text-xs uppercase tracking-[0.3em] text-white transition hover:cursor-pointer dark:border-white dark:bg-white dark:text-black"
          >
            Prosseguir
          </button>
        </form>
      </section>
    </main>
  );
}
