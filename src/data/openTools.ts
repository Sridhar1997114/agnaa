export interface OpenToolItem {
  id: string;
  name: string;
  tagline: string;
  category: 'Desktop AI Software' | 'Architectural Drawings & Sheets' | 'Engineering Calculators';
  description: string;
  features: string[];
  systemSpecs: string;
  version: string;
  downloadUrl: string;
  fileSize: string;
  badge: string;
  iconName: 'Mic' | 'Volume2' | 'FileText' | 'Cpu';
  license: string;
}

export const OPEN_STUDIO_TOOLS: OpenToolItem[] = [
  {
    id: 'agnaa-voice-portable',
    name: 'AGNAA Voice v2.0 (Whisper Offline Dictation)',
    tagline: 'Global F8 Voice-to-Text for AutoCAD, Revit & Windows',
    category: 'Desktop AI Software',
    description: 'The fastest offline voice typing companion for architects, engineers, and creators. Press F8 anywhere to speak directly into AutoCAD, Revit, Word, Chrome, and any Windows desktop application with zero cloud latency.',
    features: [
      '100% Offline & Private (Local Whisper Model)',
      'Sub-0.4s Instant Transcription',
      'Architectural CAD dimension & beam vocabulary built-in',
      'Zero installation required — single portable .exe'
    ],
    systemSpecs: 'Windows 10/11 64-bit • 4GB RAM • Any Intel/AMD CPU or NVIDIA GPU',
    version: 'v2.0 Portable',
    downloadUrl: '/downloads/Agnaa-Voice-v2.0-Windows-Portable.zip',
    fileSize: '142 MB',
    badge: 'Flagship Desktop App',
    iconName: 'Mic',
    license: 'MIT / Free for Commercial & Personal Use'
  },
  {
    id: 'agnaa-f5-tts-desktop',
    name: 'AGNAA Neural Speech (F5-TTS & Kokoro Desktop)',
    tagline: 'Packaged 1-Click Neural Text-to-Speech Studio',
    category: 'Desktop AI Software',
    description: 'Pre-packaged, zero-setup desktop distribution of cutting-edge F5-TTS and Kokoro neural speech synthesis. Eliminates Python environment errors and CUDA installation headaches, allowing anyone to generate broadcast-grade voiceovers on their local PC.',
    features: [
      'Zero Python / Conda setup — packaged Windows launcher',
      'Human-realistic emotional cadence and intonation',
      'Local ONNX & Torch acceleration for CPU or NVIDIA GPU',
      'Unlimited batch audio export (WAV / MP3)'
    ],
    systemSpecs: 'Windows 10/11 64-bit • 8GB RAM • DirectML / CPU / CUDA compatible',
    version: 'v1.2 Open Distribution',
    downloadUrl: 'https://github.com/Sridhar1997114/agnaa',
    fileSize: 'Packaged GitHub Release',
    badge: 'Neural Speech Studio',
    iconName: 'Volume2',
    license: 'Open Source / Free'
  },
  {
    id: 'agnaa-a2-standard-sheets',
    name: 'AGNAA Master A2 Architectural Detail Sheets & Standards',
    tagline: 'Standard A2 (420 × 594 mm) Working Drawings & Foundation Details',
    category: 'Architectural Drawings & Sheets',
    description: 'Comprehensive library of production-tested standard A2 architectural working drawing sheets. Includes standard isolated and raft foundation schedules, RCC column jacketing details, rainwater harvesting sumps, and GHMC title block templates.',
    features: [
      'Standard A2 format (420 × 594 mm) at 1:50 & 1:20 scales',
      'IS 456:2000 & NBC 2026 compliant structural detailing',
      'Includes AutoCAD DWG vector layers and high-res print PDFs',
      'Ready-to-use GHMC municipal sanction sheet borders'
    ],
    systemSpecs: 'Compatible with AutoCAD 2018+, Revit, LibreCAD, Vector PDF viewers',
    version: '2026 Edition',
    downloadUrl: '/calc',
    fileSize: 'Vector DWG + PDF',
    badge: 'Open Standards',
    iconName: 'FileText',
    license: 'Creative Commons CC-BY 4.0'
  }
];
