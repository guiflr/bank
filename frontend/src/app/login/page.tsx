import Input from "../components/Input";

export default function Login() {
  return (
    <main className="grid min-h-screen w-full place-items-center px-6 py-12">
      <section className="w-full max-w-md rounded-2xl border-2 border-black bg-white p-8 dark:border-white dark:bg-black">
        <form className="grid gap-5">
          <Input name="username" type="text" label="Username" />
          <Input name="password" type="password" label="Password" />
          <button
            type="submit"
            className="mt-2 border border-black bg-black px-4 py-2 text-xs rounded-md uppercase tracking-[0.3em] text-white transition hover:cursor-pointer dark:border-white dark:bg-white dark:text-black"
          >
            Prosseguir
          </button>
        </form>
      </section>
    </main>
  );
}
