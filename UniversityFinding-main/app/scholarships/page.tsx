import Link from 'next/link';
import { Award, Gift, Users, Heart, Shield, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { universities } from '@/lib/data';

export default function ScholarshipsPage() {
  const scholarshipTypes = [
    { icon: Star, name: 'Merit Scholarship', desc: 'Based on SSC & HSC GPA results. Up to 100% waiver for top students.', color: 'bg-warning/10 text-warning' },
    { icon: Heart, name: 'Need-based Scholarship', desc: 'Financial aid for students from low-income families. 20%–50% waiver.', color: 'bg-primary/10 text-primary' },
    { icon: Shield, name: 'Freedom Fighter Quota', desc: '100% waiver for children of freedom fighters.', color: 'bg-success/10 text-success' },
    { icon: Users, name: 'Sibling Discount', desc: '25% waiver for siblings studying at the same university.', color: 'bg-accent/10 text-accent' },
    { icon: Gift, name: 'Female Student Scholarship', desc: '10%–20% waiver to encourage female enrollment.', color: 'bg-primary/10 text-primary' },
    { icon: Star, name: 'Sports Scholarship', desc: 'For students with outstanding sports achievements.', color: 'bg-warning/10 text-warning' },
  ];

  const unisWithScholarships = universities.filter((u) => u.hasScholarship);

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
          <Award className="h-6 w-6" />
        </div>
        <h1 className="font-display text-3xl font-bold">Scholarships & Financial Aid</h1>
        <p className="mt-2 text-muted-foreground">
          Every private university in Bangladesh offers some form of scholarship or waiver.
        </p>
      </div>

      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {scholarshipTypes.map((type) => (
          <Card key={type.name} className="p-5">
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${type.color}`}>
              <type.icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold">{type.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{type.desc}</p>
          </Card>
        ))}
      </div>

      <h2 className="mb-4 font-display text-2xl font-bold">Universities with Scholarships</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {unisWithScholarships.slice(0, 24).map((uni) => (
          <Card key={uni.id} className="p-5">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: uni.logoColor }}
              >
                {uni.shortName.slice(0, 2)}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{uni.shortName}</div>
                <div className="text-xs text-muted-foreground">{uni.city}</div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {uni.scholarships.slice(0, 3).map((s) => (
                <Badge key={s.id} variant="secondary" className="text-xs">{s.name}</Badge>
              ))}
            </div>
            <Button asChild size="sm" variant="outline" className="mt-3 w-full">
              <Link href={`/universities/${uni.slug}`}>View Details</Link>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
