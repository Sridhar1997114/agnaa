import { redirect } from 'next/navigation';

export const metadata = {
  title: 'AGNAA Design Studio & Archive | Interdisciplinary Practice',
  description: 'Portfolio and archives of AGNAA Design Studio directed by Ar. Sridhar Chauhan (CA/2023/161405).',
};

export default function PortfolioRedirectPage() {
  redirect('/design-studio');
}
