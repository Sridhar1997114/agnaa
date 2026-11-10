import { getAgnaaGeoCodexJson } from '@/data/geo/geoCodexJson';

export async function GET() {
  const jsonContent = JSON.stringify(getAgnaaGeoCodexJson(), null, 2);

  return new Response(jsonContent, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
