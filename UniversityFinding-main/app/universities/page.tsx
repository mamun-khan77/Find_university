'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, MapPin, BadgeCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { UniversityCard } from '@/components/university-card';
import { universities } from '@/lib/data';
import { allCities } from '@/lib/types';

export default function UniversitiesPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [city, setCity] = useState<string>('all');
  const [iebOnly, setIebOnly] = useState(false);
  const [permanentOnly, setPermanentOnly] = useState(false);
  const [hostelOnly, setHostelOnly] = useState(false);
  const [scholarshipOnly, setScholarshipOnly] = useState(false);
  const [maxTuition, setMaxTuition] = useState(10000);
  const [sortBy, setSortBy] = useState('ranking');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = universities.filter((u) => {
      if (query) {
        const q = query.toLowerCase();
        if (!u.name.toLowerCase().includes(q) && !u.shortName.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (city !== 'all' && u.city !== city) return false;
      if (iebOnly && !u.iebAccredited) return false;
      if (permanentOnly && !u.permanentCampus) return false;
      if (hostelOnly && !u.hasHostel) return false;
      if (scholarshipOnly && !u.hasScholarship) return false;
      if (u.tuitionRange[0] > maxTuition) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'ranking': return a.ranking - b.ranking;
        case 'tuition-low': return a.tuitionRange[0] - b.tuitionRange[0];
        case 'tuition-high': return b.tuitionRange[0] - a.tuitionRange[0];
        case 'established': return a.established - b.established;
        case 'students': return b.students - a.students;
        default: return 0;
      }
    });

    return result;
  }, [query, city, iebOnly, permanentOnly, hostelOnly, scholarshipOnly, maxTuition, sortBy]);

  const activeFilters = [
    city !== 'all' && `City: ${city}`,
    iebOnly && 'IEB Accredited',
    permanentOnly && 'Permanent Campus',
    hostelOnly && 'Has Hostel',
    scholarshipOnly && 'Has Scholarship',
    maxTuition < 10000 && `Max ৳${maxTuition}/credit`,
  ].filter(Boolean) as string[];

  const clearAll = () => {
    setQuery('');
    setCity('all');
    setIebOnly(false);
    setPermanentOnly(false);
    setHostelOnly(false);
    setScholarshipOnly(false);
    setMaxTuition(10000);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="mb-2 block text-sm font-semibold">City</Label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger><SelectValue placeholder="All cities" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {allCities.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-3 block text-sm font-semibold">Accreditation & Facilities</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="ieb" checked={iebOnly} onCheckedChange={(v) => setIebOnly(!!v)} />
            <Label htmlFor="ieb" className="text-sm font-normal cursor-pointer">IEB Accredited</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="perm" checked={permanentOnly} onCheckedChange={(v) => setPermanentOnly(!!v)} />
            <Label htmlFor="perm" className="text-sm font-normal cursor-pointer">Permanent Campus</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="hostel" checked={hostelOnly} onCheckedChange={(v) => setHostelOnly(!!v)} />
            <Label htmlFor="hostel" className="text-sm font-normal cursor-pointer">Has Hostel</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sch" checked={scholarshipOnly} onCheckedChange={(v) => setScholarshipOnly(!!v)} />
            <Label htmlFor="sch" className="text-sm font-normal cursor-pointer">Has Scholarship</Label>
          </div>
        </div>
      </div>

      <div>
        <Label className="mb-2 block text-sm font-semibold">
          Max Tuition: ৳{maxTuition.toLocaleString()}/credit
        </Label>
        <input
          type="range"
          min={1500}
          max={10000}
          step={500}
          value={maxTuition}
          onChange={(e) => setMaxTuition(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>

      {activeFilters.length > 0 && (
        <Button variant="outline" onClick={clearAll} className="w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold">All Universities</h1>
        <p className="mt-1 text-muted-foreground">
          Browse and compare {universities.length} UGC-approved private universities in Bangladesh.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by university name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ranking">Ranking</SelectItem>
            <SelectItem value="tuition-low">Tuition: Low to High</SelectItem>
            <SelectItem value="tuition-high">Tuition: High to Low</SelectItem>
            <SelectItem value="established">Oldest First</SelectItem>
            <SelectItem value="students">Most Students</SelectItem>
          </SelectContent>
        </Select>
        <Sheet open={showFilters} onOpenChange={setShowFilters}>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
              {activeFilters.length > 0 && (
                <Badge className="ml-2" variant="secondary">{activeFilters.length}</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <div className="pt-2">
              <h2 className="font-display text-lg font-bold">Filters</h2>
            </div>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-6">
        <aside className="hidden w-64 shrink-0 lg:block">
          <Card className="sticky top-20 p-5">
            <h2 className="mb-4 font-display text-lg font-bold">Filters</h2>
            <FilterContent />
          </Card>
        </aside>

        <div className="flex-1">
          {activeFilters.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {activeFilters.map((f) => (
                <Badge key={f} variant="secondary" className="gap-1">
                  {f}
                  <button onClick={clearAll} className="ml-1 rounded-full hover:bg-muted">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <div className="mb-4 text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {universities.length} universities
          </div>

          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No universities match your filters. Try adjusting your criteria.</p>
              <Button variant="outline" onClick={clearAll} className="mt-4">Clear Filters</Button>
            </Card>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((uni) => (
                <UniversityCard key={uni.id} uni={uni} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
