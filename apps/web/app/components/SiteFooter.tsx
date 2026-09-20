import Image from "next/image";
import Link from "next/link";

const PRODUCTS = [
  { href: "/software", label: "ARK Studio" },
  { href: "/robotics", label: "Robotics" },
  { href: "/quantum", label: "Quantum" },
  { href: "/data-centers", label: "Data Centers" },
  { href: "/health", label: "Health" },
  { href: "/housing", label: "Housing" },
];

const COMPANY = [
  { href: "/careers", label: "Careers" },
  { href: "/invest", label: "Invest" },
  { href: "/merch", label: "Merch" },
  { href: "/#contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Link href="/" className="site-footer-logo" aria-label="Ark Industries — home">
            <Image src="/logo-mark.png" alt="Ark Industries" width={652} height={261} />
          </Link>
          <p className="site-footer-tagline">
            Artificial intelligence, advanced robotics, and real estate development — engineered
            into the infrastructure of tomorrow.
          </p>
        </div>

        <nav className="site-footer-col" aria-label="Products">
          <h2 className="site-footer-heading">Products</h2>
          <ul>
            {PRODUCTS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer-col" aria-label="Company">
          <h2 className="site-footer-heading">Company</h2>
          <ul>
            {COMPANY.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="site-footer-base">
        <span>&copy; {new Date().getFullYear()} Ark Industries. All rights reserved.</span>
        <a href="mailto:anthonyachkarian@gmail.com">anthonyachkarian@gmail.com</a>
      </div>
    </footer>
  );
}
