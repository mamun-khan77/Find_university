'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Trophy, Award, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { universities } from '@/lib/data';
import type { University } from '@/lib/types';

type SortKey = 'ranking' | 'tuition' | 'established' | 'students' | 'employment';

export default function RankingsPage() {
  const [sortKey, setSortKey] = useState<SortKey>('ranking');

  const sorted = useMemo(() => {
    return [...universities].sort((a, b) => {
      switch (sortKey) {
        case 'ranking': return a.ranking - b.ranking;
        case 'tuition': return a.tuitionRange[0] - b.tuitionRange[0];
        case 'established': return a.established - b.established;
        case 'students': return b.students - a.students;
        case 'employment': return b.careerStats.employmentRate - a.careerStats.employmentRate;
      }
    });
  }, [sortKey]);

  const engineeringUnis = useMemo(
    () => universities.filter((u) => u.programs.some((p) => p.faculty === 'Engineering')).sort((a, b) => a.ranking - b.ranking),
    []
  );

  const businessUnis = useMemo(
    () => universities.filter((u) => u.programs.some((p) => p.faculty === 'Business')).sort((a, b) => a.ranking - b.ranking),
    []
  );

  const iebUnis = useMemo(
    () => universities.filter((u) => u.iebAccredited).sort((a, b) => a.ranking - b.ranking),
    []
  );

  const RankRow = ({ uni, index, metric }: { uni: University; index: number; metric?: React.ReactNode }) => (
    <Link
      href={`/universities/${uni.slug}`}
      className="flex items-center gap-4 rounded-xl border border-border/60 p-4 transition-all hover:border-primary hover:shadow-sm"
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-display text-lg font-bold ${
        index === 0 ? 'bg-warning/20 text-warning' :
        index === 1 ? 'bg-muted text-muted-foreground' :
        index === 2 ? 'bg-orange-500/20 text-orange-600' :
        'bg-secondary text-muted-foreground'
      }`}>
        {index + 1}
      </div>
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
        style={{ backgroundColor: uni.logoColor }}
      >
        {uni.shortName.slice(0, 2)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold">{uni.shortName}</div>
        <div className="text-xs text-muted-foreground truncate">{uni.name}</div>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        {uni.iebAccredited && <Badge variant="outline" className="text-warning">IEB</Badge>}
        {uni.permanentCampus && <Badge variant="outline">Permanent</Badge>}
      </div>
      {metric && <div className="text-right text-sm font-semibold">{metric}</div>}
    </Link>
  );

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-warning">
          <Trophy className="h-6 w-6" />
        </div>
        <h1 className="font-display text-3xl font-bold">University Rankings</h1>
        <p className="mt-2 text-muted-foreground">
          Rankings based on academic reputation, facilities, and graduate outcomes.
        </p>
      </div>

      <Card className="mb-6 flex items-start gap-3 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Ranking Methodology:</span> Our rankings
          consider academic reputation, faculty quality, campus facilities, graduate employment
          rate, IEB accreditation, and student reviews. Rankings are compiled from UGC Bangladesh
          data, university websites, and student feedback. Last updated: June 2026.
        </div>
      </Card>

      <Tabs defaultValue="overall">
        <TabsList className="mb-6 flex h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="overall">Overall Ranking</TabsTrigger>
          <TabsTrigger value="engineering">Engineering</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="ieb">IEB Accredited</TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="space-y-3">
          <div className="mb-4 flex flex-wrap gap-2">
            {([
              { key: 'ranking', label: 'Overall Rank' },
              { key: 'tuition', label: 'Lowest Tuition' },
              { key: 'established', label: 'Oldest' },
              { key: 'students', label: 'Most Students' },
              { key: 'employment', label: 'Best Employment' },
            ] as { key: SortKey; label: string }[]).map((opt) => (
              <Button
                key={opt.key}
                size="sm"
                variant={sortKey === opt.key ? 'default' : 'outline'}
                onClick={() => setSortKey(opt.key)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
          {sorted.slice(0, 30).map((uni, i) => (
            <RankRow
              key={uni.id}
              uni={uni}
              index={i}
              metric={
                sortKey === 'ranking' ? `#${uni.ranking}` :
                sortKey === 'tuition' ? `৳${uni.tuitionRange[0].toLocaleString()}/cr` :
                sortKey === 'established' ? String(uni.established) :
                sortKey === 'students' ? `${uni.students.toLocaleString()}` :
                `${uni.careerStats.employmentRate}%`
              }
            />
          ))}
        </TabsContent>

        <TabsContent value="engineering" className="space-y-3">
          {engineeringUnis.slice(0, 20).map((uni, i) => (
            <RankRow key={uni.id} uni={uni} index={i} metric={`#${uni.ranking}`} />
          ))}
        </TabsContent>

        <TabsContent value="business" className="space-y-3">
          {businessUnis.slice(0, 20).map((uni, i) => (
            <RankRow key={uni.id} uni={uni} index={i} metric={`#${uni.ranking}`} />
          ))}
        </TabsContent>

        <TabsContent value="ieb" className="space-y-3">
          <Card className="mb-4 flex items-start gap-3 p-4">
            <Award className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
            <div className="text-sm text-muted-foreground">
              IEB (Institution of Engineers, Bangladesh) accreditation is crucial for engineering
              students. Only IEB-accredited programs allow graduates to register as professional
              engineers in Bangladesh.
            </div>
          </Card>
          {iebUnis.map((uni, i) => (
            <RankRow
              key={uni.id}
              uni={uni}
              index={i}
              metric={<Badge variant="secondary" className="text-warning">IEB Accredited</Badge>}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
