
// app/about/layout.tsx

//It must accept a children prop, which is where your page.tsx content will be rendered:
//Note: <main> tag  This renders your app/about/page.tsx content

/*
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="about-layout-wrapper">
      <aside>About Sidebar</aside>
      

      <main>{children}</main>
    </section>
  );
}
*/
// app/about/layout.tsx
import Link from "next/link";
import "../globals.css";
export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav className="sub-nav">
        <ul>
          <li><Link href="/about">Overview</Link></li>
          <li><Link href="/about/team">Team</Link></li>
          <li><Link href="/about/history">History</Link></li>
        </ul>
      </nav>

      <div className="sub-content">
        {children}
      </div>
    </section>
  );
}
