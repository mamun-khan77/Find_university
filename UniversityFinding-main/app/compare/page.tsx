'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { GitCompare, X, Plus, Check, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { universities, getUniversityBySlug } from '@/lib/data';
import type { University } from '@/lib/types';

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  useEffect(() => {
    const ids = searchParams.get('ids');
    if (ids) {
      const slugs = ids.split(',').filter(Boolean);
      setSelectedSlugs(slugs.slice(0, 4));
    }
  }, [searchParams]);

  const selected = useMemo(
    () => selectedSlugs.map((s) => getUniversityBySlug(s)).filter(Boolean) as University[],
    [selectedSlugs]
  );

  const addUniversity = (slug: string) => {
    if (selectedSlugs.length < 4 && !selectedSlugs.includes(slug)) {
      setSelectedSlugs([...selectedSlugs, slug]);
    }
  };

  const removeUniversity = (slug: string) => {
    setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
  };

  const availableToAdd = universities.filter((u) => !selectedSlugs.includes(u.slug));

  const compareRows: { label: string; getValue: (u: University) => React.ReactNode; highlight?: boolean }[] = [
    { label: 'City', getValue: (u) => u.city },
    { label: 'Established', getValue: (u) => String(u.established) },
    { label: 'Ranking', getValue: (u) => `#${u.ranking}`, highlight: true },
    { label: 'UGC Approved', getValue: (u) => u.ugcApproved ? <Check className="h-4 w-4 text-success" /> : <Minus className="h-4 w-4 text-muted-foreground" /> },
    { label: 'IEB Accredited', getValue: (u) => u.iebAccredited ? <Badge variant="secondary" className="text-warning">Yes</Badge> : 'No' },
    { label: 'IEB Departments', getValue: (u) => u.iebDepartments.length > 0 ? u.iebDepartments.join(', ') : '—' },
    { label: 'Permanent Campus', getValue: (u) => u.permanentCampus ? <Check className="h-4 w-4 text-success" /> : <Minus className="h-4 w-4 text-muted-foreground" /> },
    { label: 'Tuition (per credit)', getValue: (u) => `৳${u.tuitionRange[0].toLocaleString()}–${u.tuitionRange[1].toLocaleString()}`, highlight: true },
    { label: 'Students', getValue: (u) => u.students.toLocaleString() },
    { label: 'Faculty', getValue: (u) => u.faculty.toLocaleString() },
    { label: 'Programs', getValue: (u) => String(u.programs.length) },
    { label: 'Scholarships', getValue: (u) => u.hasScholarship ? <Check className="h-4 w-4 text-success" /> : <Minus className="h-4 w-4 text-muted-foreground" /> },
    { label: 'Hostel', getValue: (u) => u.hasHostel ? <Check className="h-4 w-4 text-success" /> : <Minus className="h-4 w-4 text-muted-foreground" /> },
    { label: 'Transport', getValue: (u) => u.hasTransport ? <Check className="h-4 w-4 text-success" /> : <Minus className="h-4 w-4 text-muted-foreground" /> },
    { label: 'Employment Rate', getValue: (u) => `${u.careerStats.employmentRate}%`, highlight: true },
    { label: 'Avg Salary', getValue: (u) => u.careerStats.averageSalary },
    { label: 'Top Recruiter', getValue: (u) => u.careerStats.topRecruiters[0] },
    { label: 'Clubs', getValue: (u) => String(u.clubs.length) },
    { label: 'Facilities', getValue: (u) => String(u.facilities.length) },
    { label: 'Campus Area', getValue: (u) => u.campusArea },
    { label: 'Semester System', getValue: (u) => u.semesterSystem },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <GitCompare className="h-6 w-6" />
        </div>
        <h1 className="font-display text-3xl font-bold">Compare Universities</h1>
        <p className="mt-2 text-muted-foreground">
          Compare up to 4 universities side-by-side across 20+ criteria.
        </p>
      </div>

      {selected.length === 0 && (
        <Card className="mb-6 p-6">
          <Label className="mb-2 block">Add universities to compare</Label>
          <Select value="" onValueChange={addUniversity}>
            <SelectTrigger><SelectValue placeholder="Select a university to add" /></SelectTrigger>
            <SelectContent className="max-h-72">
              {availableToAdd.map((u) => (
                <SelectItem key={u.slug} value={u.slug}>{u.shortName} — {u.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>
      )}

      {selected.length > 0 && (
        <>
          {selected.length < 4 && (
            <Card className="mb-6 p-4">
              <div className="flex items-center gap-3">
                <Select value="" onValueChange={addUniversity}>
                  <SelectTrigger className="flex-1"><SelectValue placeholder="Add another university" /></SelectTrigger>
                  <SelectContent className="max-h-72">
                    {availableToAdd.map((u) => (
                      <SelectItem key={u.slug} value={u.slug}>{u.shortName} — {u.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge variant="secondary">{selected.length}/4</Badge>
              </div>
            </Card>
          )}

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="sticky left-0 z-10 bg-card p-4 text-left text-sm font-semibold">
                      Criteria
                    </th>
                    {selected.map((u) => (
                      <th key={u.id} className="min-w-[200px] p-4 text-left">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
                              style={{ backgroundColor: u.logoColor }}
                            >
                              {u.shortName.slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-display text-sm font-bold">{u.shortName}</div>
                              <div className="text-xs text-muted-foreground line-clamp-1">{u.city}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeUniversity(u.slug)}
                            className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-secondary/20' : ''}>
                      <td className={`sticky left-0 z-10 bg-card p-4 text-sm font-medium ${i % 2 === 0 ? 'bg-secondary/20' : ''}`}>
                        {row.label}
                      </td>
                      {selected.map((u) => (
                        <td key={u.id} className={`p-4 text-sm ${row.highlight ? 'font-semibold' : ''}`}>
                          {row.getValue(u)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="sticky left-0 z-10 bg-card p-4"></td>
                    {selected.map((u) => (
                      <td key={u.id} className="p-4">
                        <Button asChild size="sm" variant="outline" className="w-full">
                          <a href={`/universities/${u.slug}`}>View Profile</a>
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
