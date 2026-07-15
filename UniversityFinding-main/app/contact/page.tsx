import { Mail, Phone, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function ContactPage() {
  return (
    <div className="container max-w-2xl py-12">
      <h1 className="font-display text-3xl font-bold">Contact Us</h1>
      <p className="mt-4 text-muted-foreground">
        Have a question, suggestion, or found incorrect data? We'd love to hear from you.
      </p>

      <div className="mt-8 space-y-4">
        {[
          { icon: Mail, label: 'Email', value: 'hello@unibangla.com.bd' },
          { icon: Phone, label: 'Phone', value: '01569122069' },
          { icon: MapPin, label: 'Location', value: 'Dhaka, Bangladesh' },
        ].map((item) => (
          <Card key={item.label} className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div className="font-medium">{item.value}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-secondary/50 p-6">
        <h3 className="font-semibold">Data Corrections</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          If you find any information that is incorrect or outdated, please email us
          with the source and we'll verify and update it promptly.
        </p>
      </div>
    </div>
  );
}
