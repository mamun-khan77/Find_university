'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calculator, GraduationCap, TrendingDown, Wallet, Receipt } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { universities, getUniversityBySlug } from '@/lib/data';

export default function CalculatorPage() {
  const searchParams = useSearchParams();
  const [uniSlug, setUniSlug] = useState(searchParams.get('uni') || '');
  const [programId, setProgramId] = useState(searchParams.get('program') || '');
  const [scholarshipPct, setScholarshipPct] = useState(0);

  useEffect(() => {
    const uni = searchParams.get('uni');
    const prog = searchParams.get('program');
    if (uni) setUniSlug(uni);
    if (prog) setProgramId(prog);
  }, [searchParams]);

  const uni = useMemo(() => getUniversityBySlug(uniSlug), [uniSlug]);
  const program = useMemo(() => uni?.programs.find((p) => p.id === programId), [uni, programId]);

  const calculation = useMemo(() => {
    if (!program) return null;
    const creditFee = program.credits * program.tuitionPerCredit;
    const subtotal = program.admissionFee + creditFee + program.labFee + program.libraryFee + program.otherFee;
    const scholarshipDiscount = Math.round((subtotal * scholarshipPct) / 100);
    const finalCost = subtotal - scholarshipDiscount;
    return { creditFee, subtotal, scholarshipDiscount, finalCost };
  }, [program, scholarshipPct]);

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Calculator className="h-6 w-6" />
        </div>
        <h1 className="font-display text-3xl font-bold">Cost Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Estimate the total cost of your degree, including scholarships.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-5 font-display text-lg font-bold">Select Your Program</h2>
          <div className="space-y-5">
            <div>
              <Label className="mb-2 block">University</Label>
              <Select value={uniSlug} onValueChange={(v) => { setUniSlug(v); setProgramId(''); }}>
                <SelectTrigger><SelectValue placeholder="Choose a university" /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {universities.map((u) => (
                    <SelectItem key={u.slug} value={u.slug}>{u.shortName} — {u.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {uni && (
              <div>
                <Label className="mb-2 block">Program</Label>
                <Select value={programId} onValueChange={setProgramId}>
                  <SelectTrigger><SelectValue placeholder="Choose a program" /></SelectTrigger>
                  <SelectContent>
                    {uni.programs.map((p) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {program && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <Label>Scholarship / Waiver</Label>
                  <Badge variant="secondary">{scholarshipPct}%</Badge>
                </div>
                <Slider
                  value={[scholarshipPct]}
                  onValueChange={(v) => setScholarshipPct(v[0])}
                  max={100}
                  step={5}
                />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
            )}

            {program && (
              <div className="rounded-lg bg-secondary/50 p-4 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Degree</span>
                  <span className="font-medium">{program.degree}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{program.duration}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Total Credits</span>
                  <span className="font-medium">{program.credits}</span>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-5 font-display text-lg font-bold">Cost Breakdown</h2>
          {!calculation ? (
            <div className="flex h-64 flex-col items-center justify-center text-center text-muted-foreground">
              <GraduationCap className="mb-3 h-12 w-12 opacity-40" />
              <p>Select a university and program to see the cost breakdown.</p>
            </div>
          ) : program && calculation ? (
            <div className="space-y-4">
              <div className="space-y-3">
                {[
                  { icon: Receipt, label: 'Admission Fee', value: program.admissionFee },
                  { icon: Wallet, label: `Credit Fee (${program.credits} cr × ৳${program.tuitionPerCredit})`, value: calculation.creditFee },
                  { icon: Receipt, label: 'Lab Fee', value: program.labFee },
                  { icon: Receipt, label: 'Library Fee', value: program.libraryFee },
                  { icon: Receipt, label: 'Other Fees', value: program.otherFee },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </div>
                    <span className="font-medium">৳{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Subtotal</span>
                <span className="font-semibold">৳{calculation.subtotal.toLocaleString()}</span>
              </div>

              {scholarshipPct > 0 && (
                <div className="flex items-center justify-between text-success">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingDown className="h-4 w-4" />
                    Scholarship ({scholarshipPct}%)
                  </div>
                  <span className="font-medium">−৳{calculation.scholarshipDiscount.toLocaleString()}</span>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between rounded-xl bg-primary/5 p-4">
                <div>
                  <div className="text-sm text-muted-foreground">Estimated Final Cost</div>
                  <div className="text-xs text-muted-foreground">For entire {program.duration}</div>
                </div>
                <span className="font-display text-2xl font-bold text-primary">
                  ৳{calculation.finalCost.toLocaleString()}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                This is an estimate based on current tuition rates. Actual costs may vary.
                Verify with {uni?.shortName} before admission.
              </p>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
