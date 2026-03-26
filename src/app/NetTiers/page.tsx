import { readFileSync } from 'fs';
import { join } from 'path';

export default function NetTiersPage() {
  // Read the HTML file
  const htmlPath = join(process.cwd(), 'public', 'homepagereal.html');
  const htmlContent = readFileSync(htmlPath, 'utf8');

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}