import Link from 'next/link';
import { MapPin, BadgeCheck, Users, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { University } from '@/lib/types';

export function UniversityCard({ uni }: { uni: University }) {
  return (
    <Link href={`/universities/${uni.slug}`} className="group block h-full">
      <Card className="relative h-full overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div
          className="h-2 w-full"
          style={{ backgroundColor: uni.logoColor }}
        />
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white shadow-sm"
                style={{ backgroundColor: uni.logoColor }}
              >
                {uni.shortName.slice(0, 2)}
              </div>
              <div>
                <h3 className="font-display text-base font-bold leading-tight group-hover:text-primary transition-colors">
                  {uni.shortName}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {uni.name}
                </p>
              </div>
            </div>
            {uni.ranking <= 10 && (
              <Badge variant="secondary" className="shrink-0 text-xs">
                #{uni.ranking}
              </Badge>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs font-normal">
              <MapPin className="mr-1 h-3 w-3" /> {uni.city}
            </Badge>
            {uni.ugcApproved && (
              <Badge variant="outline" className="text-xs font-normal text-success">
                <BadgeCheck className="mr-1 h-3 w-3" /> UGC
              </Badge>
            )}
            {uni.iebAccredited && (
              <Badge variant="outline" className="text-xs font-normal text-warning">
                IEB
              </Badge>
            )}
            {uni.permanentCampus && (
              <Badge variant="outline" className="text-xs font-normal">
                Permanent Campus
              </Badge>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {uni.students.toLocaleString()} students
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              {(uni.reviews.reduce((s, r) => s + r.rating, 0) / uni.reviews.length).toFixed(1)}
            </span>
            <span className="font-semibold text-foreground">
              ৳{uni.tuitionRange[0].toLocaleString()}/cr
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
