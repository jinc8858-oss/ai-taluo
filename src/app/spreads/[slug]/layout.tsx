import spreadsData from '@/data/spreads.json';
import { Spread } from '@/lib/types';

const spreads: Spread[] = spreadsData as Spread[];

export function generateStaticParams() {
  return spreads.map((s) => ({ slug: s.slug }));
}

export default function SpreadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
