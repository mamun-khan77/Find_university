import Link from 'next/link';
import {
  Search,
  Calculator,
  GitCompare,
  Award,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  GraduationCap,
  Building2,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UniversityCard } from '@/components/university-card';
import { getFeaturedUniversities, getStats, universities } from '@/lib/data';

export default function HomePage() {
  const featured = getFeaturedUniversities();
  const stats = getStats();
  const topRanked = [...universities].sort((a, b) => a.ranking - b.ranking).slice(0, 5);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-hero-glow">
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="container relative py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-5 animate-fade-in">
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5 text-success" />
              Verified data from UGC, IEB & official sources
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl animate-fade-up">
              Compare Every Private University
              <span className="block text-primary">in Bangladesh</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Tuition, programs, rankings, IEB accreditation, scholarships, campus
              facilities — all in one trusted, transparent platform built for HSC
              students and their parents.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/universities">
                  Explore Universities <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base">
                <Link href="/finder">
                  Find Your Match
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: Building2, label: 'Universities', value: stats.totalUniversities, color: 'text-primary' },
              { icon: BookOpen, label: 'Programs', value: stats.totalPrograms, color: 'text-accent' },
              { icon: Award, label: 'IEB Accredited', value: stats.iebCount, color: 'text-warning' },
              { icon: GraduationCap, label: 'Scholarships', value: stats.scholarshipCount, color: 'text-success' },
            ].map((stat) => (
              <Card key={stat.label} className="p-5 text-center">
                <stat.icon className={`mx-auto mb-2 h-6 w-6 ${stat.color}`} />
                <div className="font-display text-2xl font-bold">{stat.value}+</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tools */}
      <section className="container py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold">Tools to Help You Decide</h2>
          <p className="mt-2 text-muted-foreground">
            Everything you need to make an informed admission decision.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Search, title: 'Search & Filter', desc: 'Find universities by city, tuition, program, IEB status and more.', href: '/universities', color: 'bg-primary/10 text-primary' },
            { icon: Calculator, title: 'Cost Calculator', desc: 'Calculate the total estimated cost for any program at any university.', href: '/calculator', color: 'bg-accent/10 text-accent' },
            { icon: GitCompare, title: 'Compare', desc: 'Compare up to 4 universities side-by-side across 15+ criteria.', href: '/compare', color: 'bg-warning/10 text-warning' },
            { icon: TrendingUp, title: 'Rankings', desc: 'See rankings by engineering, business, and international standards.', href: '/rankings', color: 'bg-success/10 text-success' },
          ].map((tool) => (
            <Link key={tool.title} href={tool.href}>
              <Card className="group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${tool.color}`}>
                  <tool.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold">{tool.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{tool.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Universities */}
      <section className="border-y border-border/60 bg-secondary/30 py-16">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold">Featured Universities</h2>
              <p className="mt-2 text-muted-foreground">
                Top-ranked private universities with verified data.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/universities">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((uni) => (
              <UniversityCard key={uni.id} uni={uni} />
            ))}
          </div>
        </div>
      </section>

      {/* Rankings Preview */}
      <section className="container py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold">Top 5 Ranked Universities</h2>
            <p className="mt-2 text-muted-foreground">
              Based on academic reputation, facilities, and graduate outcomes.
            </p>
            <div className="mt-6 space-y-3">
              {topRanked.map((uni, i) => (
                <Link
                  key={uni.id}
                  href={`/universities/${uni.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-border/60 p-4 transition-all hover:border-primary hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary font-display text-lg font-bold">
                    {i + 1}
                  </div>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: uni.logoColor }}
                  >
                    {uni.shortName.slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{uni.shortName}</div>
                    <div className="text-xs text-muted-foreground">{uni.city} • Est. {uni.established}</div>
                  </div>
                  {uni.iebAccredited && (
                    <Badge variant="outline" className="text-warning">IEB</Badge>
                  )}
                </Link>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/rankings">View Full Rankings <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold">Why Trust UniBangla?</h2>
            <p className="mt-2 text-muted-foreground">
              Transparency is our core principle. Every piece of data is sourced and verified.
            </p>
            <div className="mt-6 space-y-4">
              {[
                { icon: ShieldCheck, title: 'Verified Sources', desc: 'Data collected from UGC Bangladesh, IEB, and official university websites.' },
                { icon: CheckCircle2, title: 'Last Updated Tracking', desc: 'Every university profile shows when data was last updated.' },
                { icon: Award, title: 'IEB Accreditation Status', desc: 'Clear indication of which engineering departments have IEB accreditation.' },
                { icon: TrendingUp, title: 'Transparent Rankings', desc: 'Rankings with explained methodology and source attribution.' },
              ].map((item) => (
                <Card key={item.title} className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/60 bg-primary py-16">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground">
            Ready to Find Your University?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Take our 60-second quiz and get personalized university recommendations
            based on your budget, program, and location preferences.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6 h-12 px-8 text-base">
            <Link href="/finder">Start University Finder Quiz <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
