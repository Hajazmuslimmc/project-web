import dynamic from 'next/dynamic';

const PDFConverter = dynamic(() => import('./PDFConverter'), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default function PDFToPNGConverter() {
  return <PDFConverter />;
}