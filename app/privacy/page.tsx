export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="font-display text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>

      <div className="prose prose-sm mt-8 max-w-none text-muted-foreground">
        <h2 className="font-display text-lg font-bold text-foreground">Information We Collect</h2>
        <p>UniBangla does not require users to create an account to browse university information. We do not collect personal information unless you voluntarily contact us.</p>

        <h2 className="mt-6 font-display text-lg font-bold text-foreground">Cookies</h2>
        <p>We use essential cookies to remember your theme preference (light/dark mode) and any universities you bookmark. We do not use tracking cookies or third-party advertising.</p>

        <h2 className="mt-6 font-display text-lg font-bold text-foreground">Data Accuracy</h2>
        <p>While we strive to keep all university information accurate and up-to-date, we cannot guarantee the accuracy of every detail. Users should verify important information with the respective university before making admission decisions.</p>

        <h2 className="mt-6 font-display text-lg font-bold text-foreground">Third-Party Links</h2>
        <p>Our website contains links to external university websites. We are not responsible for the privacy practices or content of these external sites.</p>

        <h2 className="mt-6 font-display text-lg font-bold text-foreground">Contact</h2>
        <p>For privacy-related questions, contact us at hello@unibangla.com.bd.</p>
      </div>
    </div>
  );
}
