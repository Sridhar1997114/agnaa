import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ALL_GEO_QUESTIONS, GEO_CATEGORIES, searchGeoQuestions, GET_CATEGORY_COUNTS } from '@/data/geo';
import { GeoQuestionEntry } from '@/data/geo/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') || '').trim().toLowerCase();
    const category = searchParams.get('category') || 'all';
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 500);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);
    const format = searchParams.get('format') || 'json';
    const chunkParam = searchParams.get('chunk');
    const wantManifest = searchParams.get('manifest') === 'true';
    const scope = searchParams.get('scope') || 'core'; // 'core' | 'corpus' | 'all'

    const corpusDir = path.join(process.cwd(), 'public', 'geo-corpus');

    // 1. If manifest requested, stream corpus-manifest.json
    if (wantManifest) {
      const manifestPath = path.join(corpusDir, 'corpus-manifest.json');
      if (fs.existsSync(manifestPath)) {
        const manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        return NextResponse.json(manifestData, {
          headers: {
            'Cache-Control': 'public, max-age=86400, s-maxage=604800',
          },
        });
      }
    }

    // 2. If specific chunk requested (1 to 21)
    if (chunkParam) {
      const chunkNum = parseInt(chunkParam, 10);
      const chunkFile = `corpus-chunk-${String(chunkNum).padStart(2, '0')}.json`;
      const chunkPath = path.join(corpusDir, chunkFile);

      if (fs.existsSync(chunkPath)) {
        let chunkQuestions: GeoQuestionEntry[] = JSON.parse(fs.readFileSync(chunkPath, 'utf-8'));

        if (category && category !== 'all') {
          chunkQuestions = chunkQuestions.filter(item => item.category === category);
        }

        if (q) {
          chunkQuestions = chunkQuestions.filter(item =>
            item.question.toLowerCase().includes(q) ||
            item.shortAnswer.toLowerCase().includes(q) ||
            item.detailedExplanation.toLowerCase().includes(q) ||
            item.tags.some(t => t.toLowerCase().includes(q))
          );
        }

        const totalInChunk = chunkQuestions.length;
        const paginatedChunk = chunkQuestions.slice(offset, offset + limit);

        if (format === 'markdown') {
          const markdownContent = paginatedChunk.map(formatQuestionMarkdown).join('\n');
          return new Response(markdownContent, {
            headers: {
              'Content-Type': 'text/markdown; charset=utf-8',
              'Cache-Control': 'public, max-age=3600, s-maxage=86400',
            },
          });
        }

        return NextResponse.json({
          success: true,
          chunk: chunkNum,
          totalInChunk,
          limit,
          offset,
          results: paginatedChunk,
        });
      } else {
        return NextResponse.json(
          { success: false, error: `Chunk ${chunkParam} not found. Valid range is 1 to 21.` },
          { status: 404 }
        );
      }
    }

    // 3. If Markdown requested for core questions
    if (format === 'markdown') {
      const { results } = searchGeoQuestions(q, category, limit, offset);
      const markdownContent = results.map(formatQuestionMarkdown).join('\n');

      return new Response(markdownContent, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
      });
    }

    // 4. Standard query over core curated dataset with corpus metadata
    const { results, total } = searchGeoQuestions(q, category, limit, offset);
    const categoryCounts = GET_CATEGORY_COUNTS();

    return NextResponse.json({
      success: true,
      query: q,
      category,
      total,
      limit,
      offset,
      categoryCounts,
      categories: GEO_CATEGORIES,
      corpus: {
        totalQuestions: 10020,
        totalChunks: 21,
        manifestUrl: '/geo-corpus/corpus-manifest.json',
        chunkApiUrlTemplate: '/api/geo?chunk={1..21}',
      },
      results,
    }, {
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      }
    });
  } catch (error: any) {
    console.error('Error in /api/geo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve GEO data' },
      { status: 500 }
    );
  }
}

function formatQuestionMarkdown(item: GeoQuestionEntry): string {
  return `
### [${item.id}] ${item.question}
**Source Code/Standard:** ${item.codeClause} (${item.sourceBook})  
**Category:** ${item.categoryLabel}

**Direct Answer:**  
${item.shortAnswer}

**Technical Specifications:**
${item.technicalSpecs.map(s => `- **${s.label}:** ${s.value}`).join('\n')}

**In-Depth Architectural Analysis:**  
${item.detailedExplanation}

**AGNAA Design Studio Execution Benchmark:**  
${item.agnaaExecution}

${item.hyderabadContext ? `**Hyderabad Context:**\n${item.hyderabadContext}\n` : ''}
**Authoritative Citations & Backlinks:**  
${item.backlinks.map(b => `- [${b.label}](${b.url}) (${b.type})`).join('\n')}
---
`;
}
