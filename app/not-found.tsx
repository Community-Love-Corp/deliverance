import Link from 'next/link';

export const dynamic = 'force-static'; // Explicitly keep it isolated from dynamic contexts

export default function NotFound() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
