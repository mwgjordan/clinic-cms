import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the admin page in the public directory
    window.location.href = '/admin/index.html';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Redirecting to Admin...</h1>
      <p>If you are not redirected automatically, please click <a href="/admin/index.html" className="text-blue-600 hover:underline">here</a>.</p>
    </div>
  );
}
