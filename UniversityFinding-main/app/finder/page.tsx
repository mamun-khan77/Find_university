'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { universities } from '@/lib/data';
import { allCities } from '@/lib/types';
import type { University } from '@/lib/types';

interface Answers {
  budget: string;
  city: string;
  program: string;
  hostel: string;
  scholarship: string;
  ieb: string;
}

const steps = [
  { key: 'budget', title: 'What is your budget per credit?', subtitle: 'This helps us filter by tuition range' },
  { key: 'city', title: 'Preferred city?', subtitle: 'Where do you want to study?' },
  { key: 'program', title: 'What field interests you?', subtitle: 'Choose your preferred area of study' },
  { key: 'hostel', title: 'Do you need hostel facilities?', subtitle: 'On-campus accommodation' },
  { key: 'scholarship', title: 'Do you need a scholarship?', subtitle: 'Financial aid availability' },
  { key: 'ieb', title: 'Do you need IEB accreditation?', subtitle: 'Important for engineering students' },
];

export default function FinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    budget: '', city: '', program: '', hostel: '', scholarship: '', ieb: '',
  });
  const [results, setResults] = useState<University[] | null>(null);

  const setAnswer = (key: keyof Answers, value: string) => {
    setAnswers({ ...answers, [key]: value });
  };

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      calculateResults();
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const calculateResults = () => {
    let scored = universities.map((u) => {
      let score = 0;
      if (answers.budget === 'low' && u.tuitionRange[0] <= 3000) score += 3;
      else if (answers.budget === 'low' && u.tuitionRange[0] <= 4000) score += 1;
      else if (answers.budget === 'mid' && u.tuitionRange[0] >= 3000 && u.tuitionRange[0] <= 6000) score += 3;
      else if (answers.budget === 'high' && u.tuitionRange[0] >= 5000) score += 3;

      if (answers.city && answers.city !== 'any' && u.city === answers.city) score += 3;
      else if (answers.city === 'any') score += 1;

      if (answers.program && u.programs.some((p) => p.faculty === answers.program)) score += 3;
      else if (answers.program === 'any') score += 1;

      if (answers.hostel === 'yes' && u.hasHostel) score += 3;
      else if (answers.hostel === 'no') score += 1;

      if (answers.scholarship === 'yes' && u.hasScholarship) score += 2;

      if (answers.ieb === 'yes' && u.iebAccredited) score += 5;
      else if (answers.ieb === 'no') score += 1;

      score += Math.max(0, 20 - u.ranking) * 0.1;
      return { uni: u, score };
    });

    scored.sort((a, b) => b.score - a.score);
    setResults(scored.slice(0, 5).map((s) => s.uni));
  };

  const restart = () => {
    setResults(null);
    setStep(0);
    setAnswers({ budget: '', city: '', program: '', hostel: '', scholarship: '', ieb: '' });
  };

  const currentStep = steps[step];
  const canProceed = answers[currentStep.key as keyof Answers] !== '';

  if (results) {
    return (
      <div className="container py-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="font-display text-3xl font-bold">Your Top 5 Matches</h1>
          <p className="mt-2 text-muted-foreground">
            Based on your preferences, here are the best university matches for you.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {results.map((uni, i) => (
            <Card key={uni.id} className="flex items-center gap-4 p-5">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-xl font-bold ${
                i === 0 ? 'bg-warning/20 text-warning' : 'bg-secondary'
              }`}>
                {i + 1}
              </div>
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: uni.logoColor }}
              >
                {uni.shortName.slice(0, 2)}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{uni.shortName}</div>
                <div className="text-xs text-muted-foreground">{uni.city} • ৳{uni.tuitionRange[0].toLocaleString()}/credit</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {uni.iebAccredited && <Badge variant="outline" className="text-xs text-warning">IEB</Badge>}
                  {uni.hasHostel && <Badge variant="outline" className="text-xs">Hostel</Badge>}
                  {uni.hasScholarship && <Badge variant="outline" className="text-xs text-success">Scholarship</Badge>}
                </div>
              </div>
              <Button asChild size="sm">
                <Link href={`/universities/${uni.slug}`}>View <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={restart}>Take Quiz Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="h-6 w-6" />
        </div>
        <h1 className="font-display text-3xl font-bold">University Finder Quiz</h1>
        <p className="mt-2 text-muted-foreground">
          Answer 6 quick questions and get personalized recommendations.
        </p>
      </div>

      <Card className="mx-auto max-w-2xl p-8">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Question {step + 1} of {steps.length}</span>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-8 rounded-full ${i <= step ? 'bg-primary' : 'bg-muted'}`}
              />
            ))}
          </div>
        </div>

        <h2 className="font-display text-xl font-bold">{currentStep.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{currentStep.subtitle}</p>

        <div className="mt-6">
          {currentStep.key === 'budget' && (
            <RadioGroup
              value={answers.budget}
              onValueChange={(v) => setAnswer('budget', v)}
            >
              {[
                { value: 'low', label: 'Low (Under ৳3,000/credit)' },
                { value: 'mid', label: 'Medium (৳3,000–6,000/credit)' },
                { value: 'high', label: 'High (Above ৳6,000/credit)' },
              ].map((opt) => (
                <Label key={opt.value} htmlFor={opt.value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 p-4 transition-colors hover:bg-secondary [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                  <RadioGroupItem id={opt.value} value={opt.value} />
                  <span className="text-sm font-medium">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}

          {currentStep.key === 'city' && (
            <Select value={answers.city} onValueChange={(v) => setAnswer('city', v)}>
              <SelectTrigger><SelectValue placeholder="Select a city" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any city</SelectItem>
                {allCities.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {currentStep.key === 'program' && (
            <RadioGroup
              value={answers.program}
              onValueChange={(v) => setAnswer('program', v)}
            >
              {[
                { value: 'Engineering', label: 'Engineering (CSE, EEE, Civil, etc.)' },
                { value: 'Business', label: 'Business (BBA, MBA)' },
                { value: 'Architecture', label: 'Architecture' },
                { value: 'Science', label: 'Science (Economics, etc.)' },
                { value: 'Arts', label: 'Arts (English, Media, etc.)' },
                { value: 'Law', label: 'Law (LLB)' },
                { value: 'any', label: 'Not sure yet' },
              ].map((opt) => (
                <Label key={opt.value} htmlFor={opt.value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 p-4 transition-colors hover:bg-secondary [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                  <RadioGroupItem id={opt.value} value={opt.value} />
                  <span className="text-sm font-medium">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}

          {['hostel', 'scholarship', 'ieb'].includes(currentStep.key) && (
            <RadioGroup
              value={answers[currentStep.key as keyof Answers]}
              onValueChange={(v) => setAnswer(currentStep.key as keyof Answers, v)}
            >
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No / Not important' },
              ].map((opt) => (
                <Label key={opt.value} htmlFor={opt.value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 p-4 transition-colors hover:bg-secondary [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                  <RadioGroupItem id={opt.value} value={opt.value} />
                  <span className="text-sm font-medium">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={back} disabled={step === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={next} disabled={!canProceed}>
            {step === steps.length - 1 ? (
              <>Get Results <Sparkles className="ml-2 h-4 w-4" /></>
            ) : (
              <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
