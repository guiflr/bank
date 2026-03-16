import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white text-black antialiased dark:bg-black dark:text-white">
        {children}
      </body>
    </html>
  );
}
