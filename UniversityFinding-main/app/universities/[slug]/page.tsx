'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import {
  MapPin,
  Award,
  Star,
  ExternalLink,
  Building2,
  Calendar,
  Users,
  Briefcase,
  CheckCircle2,
  BookOpen,
  DollarSign,
  Globe,
  Phone,
  Mail,
  UserCheck,
  Building,
  HeartHandshake,
  Search,
  Check,
  Facebook,
  Linkedin,
  Clock,
  Compass,
  GraduationCap,
  ShieldCheck,
  Info
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { getUniversityBySlug } from '@/lib/data';

export default function UniversityPage({ params }: { params: { slug: string } }) {
  const uni = getUniversityBySlug(params.slug);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('All');

  if (!uni) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold">University Not Found</h2>
        <p className="mt-2 text-muted-foreground">The university you are looking for does not exist or has been removed.</p>
        <Button asChild className="mt-4">
          <Link href="/universities">Back to Universities List</Link>
        </Button>
      </div>
    );
  }

  // Calculate Average Rating
  const avgRating = useMemo(() => {
    if (!uni.reviews || uni.reviews.length === 0) return '0.0';
    return (uni.reviews.reduce((s, r) => s + r.rating, 0) / uni.reviews.length).toFixed(1);
  }, [uni.reviews]);

  // Calculate Category Average Ratings
  const categoryRatings = useMemo(() => {
    if (!uni.reviews || uni.reviews.length === 0) {
      return { teachers: 0, campus: 0, labs: 0, environment: 0, career: 0, library: 0 };
    }
    const sums = { teachers: 0, campus: 0, labs: 0, environment: 0, career: 0, library: 0 };
    uni.reviews.forEach((r) => {
      sums.teachers += r.categories.teachers;
      sums.campus += r.categories.campus;
      sums.labs += r.categories.labs;
      sums.environment += r.categories.environment;
      sums.career += r.categories.career;
      sums.library += r.categories.library;
    });
    const len = uni.reviews.length;
    return {
      teachers: parseFloat((sums.teachers / len).toFixed(1)),
      campus: parseFloat((sums.campus / len).toFixed(1)),
      labs: parseFloat((sums.labs / len).toFixed(1)),
      environment: parseFloat((sums.environment / len).toFixed(1)),
      career: parseFloat((sums.career / len).toFixed(1)),
      library: parseFloat((sums.library / len).toFixed(1)),
    };
  }, [uni.reviews]);

  // Unique list of faculties for filtering
  const facultiesList = useMemo(() => {
    const list = new Set<string>();
    uni.programs.forEach((p) => {
      if (p.faculty) list.add(p.faculty);
    });
    return ['All', ...Array.from(list)];
  }, [uni.programs]);

  // Filtered programs
  const filteredPrograms = useMemo(() => {
    return uni.programs.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.degree.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFaculty = selectedFaculty === 'All' || p.faculty === selectedFaculty;
      return matchesSearch && matchesFaculty;
    });
  }, [uni.programs, searchTerm, selectedFaculty]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-950/20">
      
      {/* Cover / Hero Header */}
      <div className="relative h-48 md:h-64 lg:h-72 w-full overflow-hidden bg-gradient-to-r from-slate-900 to-indigo-950">
        <div className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
        
        {uni.campusImages && uni.campusImages[0] && (
          <img 
            src={uni.campusImages[0]} 
            alt={`${uni.name} Campus`}
            className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-30"
          />
        )}
      </div>

      {/* Main Profile Info Header */}
      <div className="container relative z-10 -mt-20 md:-mt-24 mb-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end justify-between">
          <div className="flex flex-col md:flex-row gap-5 items-start md:items-end">
            {/* University Logo / Badge */}
            <div 
              className="flex h-28 w-28 md:h-36 md:w-36 items-center justify-center rounded-3xl text-3xl md:text-4xl font-black text-white shadow-xl ring-4 ring-background shrink-0" 
              style={{ backgroundColor: uni.logoColor }}
            >
              {uni.shortName}
            </div>
            
            {/* University Names & UGC status */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-semibold gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> UGC Approved
                </Badge>
                {uni.iebAccredited && (
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 font-semibold gap-1">
                    <Award className="h-3.5 w-3.5" /> IEB Accredited
                  </Badge>
                )}
                {uni.permanentCampus && (
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 font-semibold gap-1">
                    <Building className="h-3.5 w-3.5" /> Permanent Campus
                  </Badge>
                )}
              </div>
              <h1 className="font-display text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                {uni.name} ({uni.shortName})
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-rose-500" /> {uni.city}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 hidden sm:inline" />
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Est. {uni.established}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 hidden sm:inline" />
                <span className="flex items-center gap-1">
                  <Globe className="h-4 w-4" /> {uni.type} University
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <Button asChild size="lg" className="shadow-md h-11 px-5 gap-2">
              <a href={uni.website} target="_blank" rel="noopener noreferrer">
                Visit Website <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 px-5 gap-2 bg-background">
              <Link href={`/compare?ids=${uni.slug}`}>
                Compare <Clock className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="container mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="shadow-sm border-slate-200/60 dark:border-slate-800/50 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">National Rank</p>
                <h4 className="text-xl md:text-2xl font-bold mt-0.5">#{uni.ranking}</h4>
                <p className="text-[10px] text-muted-foreground font-medium truncate max-w-[130px]">{uni.qsRanking || 'UGC Ranking'}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-slate-200/60 dark:border-slate-800/50 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl shrink-0">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Enrollment</p>
                <h4 className="text-xl md:text-2xl font-bold mt-0.5">{uni.students.toLocaleString()}</h4>
                <p className="text-[10px] text-muted-foreground font-medium">{uni.faculty} Faculty Members</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200/60 dark:border-slate-800/50 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl shrink-0">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Est. Tuition</p>
                <h4 className="text-xl md:text-2xl font-bold mt-0.5">
                  ৳{(uni.tuitionRange[0] / 1000).toFixed(0)}k–৳{(uni.tuitionRange[1] / 1000).toFixed(0)}k
                </h4>
                <p className="text-[10px] text-muted-foreground font-medium">Per Credit Cost Range</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200/60 dark:border-slate-800/50 bg-background/50 backdrop-blur-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl shrink-0">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Avg Rating</p>
                <h4 className="text-xl md:text-2xl font-bold mt-0.5 flex items-center gap-1.5">
                  {avgRating} <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                </h4>
                <p className="text-[10px] text-muted-foreground font-medium">{uni.reviews.length} Verified Reviews</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container pb-16">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 h-auto p-1 bg-slate-200/60 dark:bg-slate-900 border border-slate-200/40 rounded-xl gap-1">
            <TabsTrigger value="overview" className="rounded-lg py-2.5 text-xs md:text-sm font-semibold">Overview</TabsTrigger>
            <TabsTrigger value="programs" className="rounded-lg py-2.5 text-xs md:text-sm font-semibold">Programs</TabsTrigger>
            <TabsTrigger value="scholarships" className="rounded-lg py-2.5 text-xs md:text-sm font-semibold">Scholarships</TabsTrigger>
            <TabsTrigger value="career" className="rounded-lg py-2.5 text-xs md:text-sm font-semibold">Career Info</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg py-2.5 text-xs md:text-sm font-semibold">Reviews ({uni.reviews.length})</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left description column */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-sm border-slate-200/60 dark:border-slate-800/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">About the University</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base space-y-4">
                    <p>{uni.description}</p>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex flex-col space-y-1">
                        <span className="text-muted-foreground font-semibold">Vice Chancellor</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{uni.viceChancellor}</span>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="text-muted-foreground font-semibold">Semester System</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{uni.semesterSystem}</span>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="text-muted-foreground font-semibold">Campus Area</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{uni.campusArea}</span>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <span className="text-muted-foreground font-semibold">Campus Status</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {uni.permanentCampus ? 'Permanent Campus' : 'Temporary/Rental Campus'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Facilities Card */}
                <Card className="shadow-sm border-slate-200/60 dark:border-slate-800/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Facilities</CardTitle>
                    <CardDescription>Available amenities and resources at {uni.shortName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {uni.facilities.map((fac) => (
                        <Badge key={fac} variant="secondary" className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                          <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> {fac}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Clubs Card */}
                <Card className="shadow-sm border-slate-200/60 dark:border-slate-800/50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">Co-Curricular Clubs</CardTitle>
                    <CardDescription>Active clubs and organizations for student engagement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {uni.clubs.map((club) => (
                        <Badge key={club} variant="outline" className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border-indigo-500/20 bg-indigo-500/5 text-indigo-700 dark:text-indigo-300">
                          <Compass className="mr-1.5 h-3.5 w-3.5 text-indigo-500" /> {club}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Contacts / Info column */}
              <div className="space-y-6">
                <Card className="shadow-sm border-slate-200/60 dark:border-slate-800/50 bg-background">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Contact & Location</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex gap-3">
                      <MapPin className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">Address</p>
                        <p className="text-muted-foreground mt-0.5 leading-relaxed">{uni.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Phone className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">Phone</p>
                        <a href={`tel:${uni.phone}`} className="text-primary hover:underline mt-0.5 block">{uni.phone}</a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Mail className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">Email</p>
                        <a href={`mailto:${uni.email}`} className="text-primary hover:underline mt-0.5 block">{uni.email}</a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Globe className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">Official Website</p>
                        <a href={uni.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mt-0.5 flex items-center gap-1 font-medium">
                          {uni.website.replace('https://', '')} <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Social networks if present */}
                    {uni.socialLinks && (
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wide">Social Links:</span>
                        {uni.socialLinks.facebook && (
                          <a href={uni.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20">
                            <Facebook className="h-4 w-4" />
                          </a>
                        )}
                        {uni.socialLinks.linkedin && (
                          <a href={uni.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-700/10 text-blue-800 rounded-lg hover:bg-blue-700/20">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Additional campus features status */}
                <Card className="shadow-sm border-slate-200/60 dark:border-slate-800/50">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Key Attributes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium flex items-center gap-2">
                        <Building className="h-4 w-4 text-slate-500" /> Hostels Available
                      </span>
                      <Badge className={uni.hasHostel ? 'bg-emerald-500/15 text-emerald-600 border-none' : 'bg-rose-500/15 text-rose-600 border-none'}>
                        {uni.hasHostel ? 'Yes' : 'No'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-slate-500" /> Transport Facility
                      </span>
                      <Badge className={uni.hasTransport ? 'bg-emerald-500/15 text-emerald-600 border-none' : 'bg-rose-500/15 text-rose-600 border-none'}>
                        {uni.hasTransport ? 'Yes' : 'No'}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground font-medium flex items-center gap-2">
                        <Award className="h-4 w-4 text-slate-500" /> Scholarships
                      </span>
                      <Badge className={uni.hasScholarship ? 'bg-emerald-500/15 text-emerald-600 border-none' : 'bg-rose-500/15 text-rose-600 border-none'}>
                        {uni.hasScholarship ? 'Yes' : 'No'}
                      </Badge>
                    </div>

                    {uni.iebAccredited && (
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                        <p className="font-semibold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-2">IEB Accredited Programs</p>
                        <div className="flex flex-wrap gap-1.5">
                          {uni.iebDepartments.map((dept) => (
                            <Badge key={dept} variant="secondary" className="px-2 py-0.5 text-[10px] font-bold">
                              {dept}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

            </div>
          </TabsContent>

          {/* Programs Tab */}
          <TabsContent value="programs" className="space-y-6">
            <Card className="shadow-sm border-slate-200/60 dark:border-slate-800/50">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold">Academic Programs & Tuition Fee Details</CardTitle>
                    <CardDescription>Estimated total tuition fee computed based on credits and standard fees</CardDescription>
                  </div>
                  
                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative w-full sm:w-60">
                      <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search programs..."
                        className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <select
                      className="h-9 w-full sm:w-44 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                      value={selectedFaculty}
                      onChange={(e) => setSelectedFaculty(e.target.value)}
                    >
                      {facultiesList.map((fac) => (
                        <option key={fac} value={fac}>{fac} Faculty</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                {filteredPrograms.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">No academic programs match your query filters.</div>
                ) : (
                  <Table>
                    <TableHeader className="bg-slate-100/50 dark:bg-slate-900/60">
                      <TableRow>
                        <TableHead className="font-bold">Program Name</TableHead>
                        <TableHead className="font-bold">Faculty</TableHead>
                        <TableHead className="font-bold">Duration</TableHead>
                        <TableHead className="font-bold">Credits</TableHead>
                        <TableHead className="font-bold text-right">Cost Per Credit</TableHead>
                        <TableHead className="font-bold text-right">Est. Total Tuition</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPrograms.map((prog) => {
                        const totalTuition = (prog.credits * prog.tuitionPerCredit) + prog.admissionFee + (prog.labFee * 8) + (prog.libraryFee * 8) + (prog.otherFee * 8);
                        return (
                          <TableRow key={prog.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                            <TableCell className="font-semibold text-slate-800 dark:text-slate-200">
                              <div>{prog.name}</div>
                              <div className="text-xs text-muted-foreground mt-0.5 font-medium">Degree: {prog.degree}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs font-semibold capitalize bg-slate-100/40 text-slate-700 dark:text-slate-300">
                                {prog.faculty}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-slate-700 dark:text-slate-300 font-medium">{prog.duration}</TableCell>
                            <TableCell className="text-slate-700 dark:text-slate-300 font-medium">{prog.credits} Credits</TableCell>
                            <TableCell className="text-right font-medium">৳{prog.tuitionPerCredit.toLocaleString()}</TableCell>
                            <TableCell className="text-right font-bold text-primary">
                              ৳{totalTuition.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {uni.scholarships && uni.scholarships.map((sch) => (
                <Card key={sch.id} className="shadow-sm border-slate-200/60 dark:border-slate-800/50 flex flex-col justify-between">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Badge className="bg-indigo-500/10 text-indigo-700 hover:bg-indigo-500/20 border-none font-bold text-[10px] uppercase tracking-wide">
                          {sch.type}
                        </Badge>
                        <CardTitle className="text-lg font-bold mt-2">{sch.name}</CardTitle>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-2xl font-black text-primary block">{sch.waiver}</span>
                        <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Waiver Range</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <p className="flex gap-2">
                        <span className="font-semibold shrink-0">Criteria:</span>
                        <span>{sch.condition}</span>
                      </p>
                      <p className="flex gap-2 items-center">
                        <span className="font-semibold shrink-0">Required CGPA:</span>
                        <Badge variant="outline" className="font-bold bg-background text-xs">
                          {sch.minCgpa.toFixed(2)} CGPA
                        </Badge>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Career outcomes Tab */}
          <TabsContent value="career" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Placement Stat */}
              <Card className="shadow-sm border-slate-200/60 dark:border-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Employment Rate</CardTitle>
                  <CardDescription>Within 6 months after graduation</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="relative flex items-center justify-center h-36 w-36 mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle 
                        cx="72" cy="72" r="60" 
                        className="stroke-muted fill-transparent" 
                        strokeWidth="12" 
                      />
                      <circle 
                        cx="72" cy="72" r="60" 
                        className="stroke-primary fill-transparent transition-all duration-1000 ease-out" 
                        strokeWidth="12" 
                        strokeDasharray={2 * Math.PI * 60}
                        strokeDashoffset={2 * Math.PI * 60 * (1 - uni.careerStats.employmentRate / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-black text-slate-900 dark:text-white">{uni.careerStats.employmentRate}%</span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Placement</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold gap-1 mt-2">
                    <CheckCircle2 className="h-3.5 w-3.5" /> High Employability Rate
                  </Badge>
                </CardContent>
              </Card>

              {/* Salary & Internships info */}
              <Card className="shadow-sm border-slate-200/60 dark:border-slate-800/50 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Salary & Internship Assistance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center gap-4">
                      <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl">
                        <Briefcase className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Average Starting Salary</p>
                        <p className="text-lg font-bold text-slate-850 dark:text-slate-100 mt-0.5">{uni.careerStats.averageSalary}</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl">
                        <HeartHandshake className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Internship Assistance</p>
                        <p className="text-lg font-bold text-slate-850 dark:text-slate-100 mt-0.5">
                          {uni.careerStats.internshipSupport ? '100% Support' : 'Available'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-250 mb-3 uppercase text-xs tracking-wider">Top Recruiting Companies</h5>
                    <div className="flex flex-wrap gap-2">
                      {uni.careerStats.topRecruiters.map((company) => (
                        <Badge key={company} variant="secondary" className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 dark:bg-slate-850 dark:text-slate-200">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Ratings Summary Column */}
              <Card className="shadow-sm border-slate-200/60 dark:border-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Feedback Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  
                  <div className="flex flex-col items-center justify-center p-4 border-b border-slate-100 dark:border-slate-800 text-center">
                    <span className="text-5xl font-black text-slate-900 dark:text-white">{avgRating}</span>
                    <div className="flex gap-1.5 my-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          className={`h-5 w-5 ${s <= Math.round(parseFloat(avgRating)) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{uni.reviews.length} Verified Student Reviews</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold text-xs text-slate-700 dark:text-slate-350">
                        <span>Faculty & Teaching</span>
                        <span>{categoryRatings.teachers} / 5</span>
                      </div>
                      <Progress value={categoryRatings.teachers * 20} className="h-2" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold text-xs text-slate-700 dark:text-slate-350">
                        <span>Campus Infrastructure</span>
                        <span>{categoryRatings.campus} / 5</span>
                      </div>
                      <Progress value={categoryRatings.campus * 20} className="h-2 text-primary" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold text-xs text-slate-700 dark:text-slate-350">
                        <span>Laboratory & Equipment</span>
                        <span>{categoryRatings.labs} / 5</span>
                      </div>
                      <Progress value={categoryRatings.labs * 20} className="h-2" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold text-xs text-slate-700 dark:text-slate-350">
                        <span>Campus Environment</span>
                        <span>{categoryRatings.environment} / 5</span>
                      </div>
                      <Progress value={categoryRatings.environment * 20} className="h-2" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold text-xs text-slate-700 dark:text-slate-350">
                        <span>Career Prospects</span>
                        <span>{categoryRatings.career} / 5</span>
                      </div>
                      <Progress value={categoryRatings.career * 20} className="h-2" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between font-semibold text-xs text-slate-700 dark:text-slate-350">
                        <span>Library Resources</span>
                        <span>{categoryRatings.library} / 5</span>
                      </div>
                      <Progress value={categoryRatings.library * 20} className="h-2" />
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Review list column */}
              <div className="lg:col-span-2 space-y-4">
                {uni.reviews && uni.reviews.map((rev) => (
                  <Card key={rev.id} className="shadow-sm border-slate-200/60 dark:border-slate-800/50">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs uppercase text-slate-700 dark:text-slate-300">
                          {rev.author.slice(0, 2)}
                        </div>
                        <div>
                          <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                            {rev.author}
                            {rev.verified && (
                              <BadgeCheck className="h-4 w-4 text-emerald-500 fill-emerald-500/10" />
                            )}
                          </CardTitle>
                          <span className="text-[10px] text-muted-foreground font-medium">{rev.date}</span>
                        </div>
                      </div>
                      <Badge className="bg-amber-500/10 text-amber-700 hover:bg-amber-500/10 border-none font-bold gap-1">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> {rev.rating.toFixed(1)}
                      </Badge>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      <p>{rev.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

            </div>
          </TabsContent>

        </Tabs>
      </div>

    </div>
  );
}

// Subcomponent icon for badge-check
function BadgeCheck({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    </span>
  );
}
