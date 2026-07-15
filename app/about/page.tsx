import { ShieldCheck, Database, Users, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="font-display text-3xl font-bold">About UniBangla</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        UniBangla is the most comprehensive and transparent platform for comparing
        private universities in Bangladesh. We built this platform to help HSC
        students and their parents make informed admission decisions.
      </p>

      <div className="mt-8 space-y-4">
        {[
          { icon: Target, title: 'Our Mission', desc: 'To provide accurate, verified, and up-to-date information about every private university in Bangladesh in one place.' },
          { icon: ShieldCheck, title: 'Trust & Transparency', desc: 'Every piece of data on UniBangla shows its source, last updated date, and verification status. We believe transparency builds trust.' },
          { icon: Database, title: 'Data Sources', desc: 'We collect data from UGC Bangladesh, IEB, official university websites, and admission offices. All data is cross-verified before publishing.' },
          { icon: Users, title: 'Built for Students', desc: 'UniBangla is designed specifically for HSC students and their parents navigating the complex university admission process.' },
        ].map((item) => (
          <Card key={item.title} className="flex items-start gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-secondary/50 p-6">
        <h3 className="font-semibold">Built and maintained by</h3>
        <p className="mt-1 text-muted-foreground">Mamun Khan</p>
        <p className="mt-3 text-sm text-muted-foreground">
          UniBangla is an independent platform not affiliated with UGC, IEB, or any
          university. All data is collected from publicly available sources.
        </p>
      </div>
    </div>
  );
}
