import { Link } from 'react-router';

interface Properties {
  error?: Error;
}

export function LoadingOrError({ error }: Properties) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl">{error?.message ?? 'Loading...'}</h1>
      <div className="pt4">
        {error && (
          <Link className="text-blue-500 hover:text-blue-800" to="/">
            Start over
          </Link>
        )}
      </div>
    </div>
  );
}
