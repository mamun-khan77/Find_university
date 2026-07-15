import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Explore: [
    { href: '/universities', label: 'All Universities' },
    { href: '/rankings', label: 'Rankings' },
    { href: '/compare', label: 'Compare' },
    { href: '/scholarships', label: 'Scholarships' },
  ],
  Tools: [
    { href: '/calculator', label: 'Cost Calculator' },
    { href: '/finder', label: 'University Finder' },
    { href: '/universities', label: 'Search & Filter' },
  ],
  About: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/30">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold">UniBangla</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The most comprehensive and transparent platform for comparing
              private universities in Bangladesh. Built for HSC students and
              their parents.
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> hello@unibangla.com.bd
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 01569122069
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Dhaka, Bangladesh
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border/60 pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            © 2026 UniBangla. All rights reserved. Built and maintained by
            Mamun Khan. University data is collected from official university
            websites, UGC Bangladesh, IEB, and other publicly available sources.
            While we strive to keep information accurate and up to date, users
            should verify important details with the respective university
            before making admission decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
