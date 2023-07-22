import '@/styles/globals.css';
import { init, useQuery } from '@airstack/airstack-react';

init(process.env.NEXT_PUBLIC_AIRSTACK_API_KEY);

const MyComponent = () => {
  const { data, loading, error } = useQuery(query, variables, { cache: false });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Render your component using the data returned by the query
};

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
