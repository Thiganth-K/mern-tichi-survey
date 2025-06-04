export default function ThankYou() {
  return (
    <html lang="en" data-theme="retro">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Thank You</title>
      <link rel="stylesheet" href="/src/index.css" />
    </head>
    <body>
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 shadow-xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">TICHI HEARD YOU</h1>
        <p>
          You rock! Thanks for helping us build something real for peoples, by peoples.<br />
          We’ll get in touch soon – watch your DMs or WhatsApp!
        </p>
      </div>
    </div>
    </body>
    </html>
  );
}