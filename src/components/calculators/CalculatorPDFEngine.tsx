import React from 'react';
import { Mail, Phone, Globe, ShieldCheck, MapPin } from 'lucide-react';

interface CalculatorPDFEngineProps {
  id?: string;
  title: string;
  subtitle?: string;
  projectInfo?: Record<string, string>;
  contentTable: React.ReactNode;
  summaryBox?: React.ReactNode;
  totalValue?: string;
  totalSubtitle?: string;
  visualizer?: React.ReactNode;
  visualizerLabel?: string;
  date?: string;
  logo: React.ReactNode;
  watermarkLogo: React.ReactNode;
}

export const CalculatorPDFEngine: React.FC<CalculatorPDFEngineProps> = ({
  id = "agnaa-pdf-view-hq",
  title,
  subtitle = "Precision Engineering Report",
  projectInfo = {},
  contentTable,
  summaryBox,
  totalValue,
  totalSubtitle,
  visualizer,
  visualizerLabel = "Technical Spatial projection",
  date = new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }),
  logo,
  watermarkLogo
}) => {
  const commonStyles: React.CSSProperties = {
    width: '794px',
    height: '1123px',
    background: '#fff',
    position: 'relative',
    fontFamily: 'Inter, sans-serif',
    color: '#0F172A',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  const watermarkStyles: React.CSSProperties = {
    position: 'absolute',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-15deg)',
    width: 600,
    opacity: 0.03,
    zIndex: 0,
    pointerEvents: 'none'
  };

  const footerStyles: React.CSSProperties = {
    borderTop: '1px solid #F1F5F9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 60px',
    height: '70px',
    flexShrink: 0,
    background: '#fff',
    position: 'relative',
    zIndex: 1
  };

  const Header = ({ headerTitle, isSecondary }: { headerTitle: string, isSecondary?: boolean }) => (
    <div style={{ 
      background: isSecondary ? 'linear-gradient(135deg, #1C1C72 0%, #2A1B81 100%)' : 'linear-gradient(135deg, #1C1C72 0%, #2A1B81 100%)', 
      padding: isSecondary ? '30px 60px' : '50px 60px', 
      color: '#fff', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start', 
      borderBottom: '8px solid #7B2DBF', 
      flexShrink: 0,
      position: 'relative',
      zIndex: 1
    }}>
      <div>
        <div style={{ marginBottom: isSecondary ? 10 : 20 }}>
          {logo}
        </div>
        <div style={{ height: 3, width: 80, background: '#7B2DBF', marginBottom: isSecondary ? 10 : 16 }} />
        <h1 style={{ 
          fontSize: isSecondary ? 24 : 38, 
          fontWeight: 900, 
          textTransform: 'uppercase', 
          letterSpacing: '-0.03em', 
          margin: 0, 
          lineHeight: 0.9,
          maxWidth: '500px'
        }}>
          {headerTitle.split('\n').map((line, i) => (
            <React.Fragment key={i}>{line}<br/></React.Fragment>
          ))}
        </h1>
        <p style={{ 
          fontSize: 10, 
          fontWeight: 800, 
          color: '#7B2DBF', 
          textTransform: 'uppercase', 
          letterSpacing: '0.3em', 
          marginTop: 10 
        }}>
          {subtitle}
        </p>
      </div>
      
      {!isSecondary && (
        <div style={{ textAlign: 'right' }}>
          <div style={{ 
            fontSize: 10, 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em', 
            color: '#A5B4FC', 
            marginBottom: 12 
          }}>
            REPORT PARAMETERS
          </div>
          {Object.entries(projectInfo).map(([k, v]) => (
            <div key={k} style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{v}</div>
              <div style={{ fontSize: 10, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 15, fontWeight: 600 }}>
            ISSUED: {date}
          </div>
        </div>
      )}
      {isSecondary && (
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>
            PAGE 02 // VISUALIZATION
          </div>
          <div style={{ fontSize: 10, color: '#7B2DBF', marginTop: 4, fontWeight: 800 }}>
            REF: {title.replace('\n', ' ')}
          </div>
        </div>
      )}
    </div>
  );

  const Footer = () => (
    <div style={footerStyles}>
      <div style={{ fontSize: 8, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        © 2026 AGNAA DESIGN STUDIO PVT. LTD. • TECH STACK: AGNAA-GEN-03
      </div>
      
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Phone size={12} style={{ color: '#7B2DBF' }} />
          <span style={{ fontSize: 10, fontWeight: 800, color: '#1C1C72' }}>+91 8826214348</span>
        </div>
        <div style={{ width: 1, height: 16, background: '#E2E8F0' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Globe size={12} style={{ color: '#1C1C72' }} />
          <span style={{ fontSize: 10, fontWeight: 800, color: '#1C1C72' }}>WWW.AGNAA.IN</span>
        </div>
        <div style={{ 
          fontSize: 8, 
          background: '#1C1C72', 
          color: '#fff', 
          fontWeight: 900, 
          padding: '5px 12px', 
          borderRadius: 6, 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em', 
          marginLeft: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }}>
          <ShieldCheck size={10} /> VERIFIED
        </div>
        <div style={{ marginLeft: 10, textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '1px solid #E2E8F0', padding: 2, borderRadius: 4, background: '#fff' }}>
            <div style={{ width: '100%', height: '100%', background: '#000', opacity: 0.8, WebkitMask: 'radial-gradient(circle, transparent 20%, black 20%)', mask: 'radial-gradient(circle, transparent 20%, black 20%)' }} />
          </div>
          <div style={{ fontSize: 5, color: '#1C1C72', fontWeight: 900, marginTop: 2 }}>TECH VERIFY</div>
        </div>
      </div>
    </div>
  );

  return (
    <div id={id}>
      {/* PAGE 1: CALCULATIONS */}
      <div style={commonStyles}>
        <div style={watermarkStyles}>{watermarkLogo}</div>
        
        <Header headerTitle={title} />

        <div style={{ 
          flex: 1, 
          padding: '40px 60px', 
          position: 'relative', 
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ 
            fontSize: 11, 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: '#1C1C72', 
            marginBottom: 20, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '1px solid #E2E8F0',
            paddingBottom: 10
          }}>
            <span>Engineering Breakdown</span>
            <span style={{ color: '#7B2DBF' }}>Verification ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          </div>

          <div className="pdf-table-container" style={{ flex: 1 }}>
            {contentTable}
          </div>

          {summaryBox && (
            <div style={{ marginTop: 'auto', paddingTop: 30 }}>
              {summaryBox}
            </div>
          )}
        </div>

        {/* TOTAL BAR */}
        <div style={{ 
          background: 'linear-gradient(to right, #1C1C72, #7B2DBF)', 
          height: 100, 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 60px', 
          justifyContent: 'space-between', 
          flexShrink: 0,
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: 600, maxWidth: 400, lineHeight: 1.5 }}>
            <div style={{ fontWeight: 900, color: '#fff', marginBottom: 4, fontSize: 10 }}>CONFIDENTIAL ENGINEERING ESTIMATE</div>
            VALUES ARE COMPUTED BASED ON AGNAA PRECISION STANDARDS. ACTUAL CONSTRUCTION MAY VARY BY ±5% BASED ON SITE CONDITIONS AND MATERIAL GRADE.
          </div>
          
          {totalValue && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 9, color: '#A5B4FC', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                Final Estimated Value
              </div>
              <div style={{ 
                fontSize: 34, 
                fontWeight: 900, 
                color: '#fff', 
                fontVariantNumeric: 'tabular-nums', 
                lineHeight: 1,
                letterSpacing: '-0.02em'
              }}>
                {totalValue}
              </div>
              {totalSubtitle && (
                <div style={{ 
                  fontSize: 10, 
                  color: '#fff', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em',
                  background: 'rgba(123, 45, 191, 0.5)',
                  padding: '2px 8px',
                  borderRadius: 4,
                  marginTop: 6,
                  display: 'inline-block'
                }}>
                  {totalSubtitle}
                </div>
              )}
            </div>
          )}
        </div>

        <Footer />
      </div>

      {/* PAGE BREAK MARKER */}
      {visualizer && <div className="html2pdf__page-break" style={{ height: 0 }} />}

      {/* PAGE 2: VISUALIZATION (Optional) */}
      {visualizer && (
        <div style={{ ...commonStyles }}>
          <div style={watermarkStyles}>{watermarkLogo}</div>
          
          <Header headerTitle="Spatial Projection" isSecondary />

          <div style={{ 
            flex: 1, 
            padding: '40px 60px', 
            position: 'relative', 
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 24
          }}>
            {/* 50% VIEW: GRAPHICAL CALCULATIONS */}
            <div style={{ 
              flex: 1,
              border: '1.5px solid #E2E8F0', 
              borderRadius: 24, 
              overflow: 'hidden', 
              background: '#F8FAFC',
              boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ 
                padding: '12px 24px', 
                background: '#fff', 
                borderBottom: '1px solid #E2E8F0', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}>
                <span style={{ 
                  fontSize: 9, 
                  fontWeight: 900, 
                  color: '#1C1C72', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.15em' 
                }}>
                  {visualizerLabel}
                </span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <div style={{ width: 4, height: 4, background: '#7B2DBF', borderRadius: '50%' }} />
                  <span style={{ fontSize: 8, color: '#94A3B8', fontWeight: 600 }}>CAD SCALE: ADAPTIVE</span>
                </div>
              </div>
              <div style={{ 
                padding: 40, 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }}>
                <div style={{ transform: 'scale(1.4)', transformOrigin: 'center' }}>
                  {visualizer}
                </div>
              </div>
            </div>
            
            {/* OTHER CALCULATIONS / NOTES */}
            <div style={{ 
              flex: 1,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 20
            }}>
              <div style={{ 
                padding: '24px', 
                background: '#fff', 
                borderRadius: 24, 
                border: '1px solid #F1F5F9' 
              }}>
                <div style={{ fontSize: 10, fontWeight: 900, color: '#7B2DBF', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Structural Specifications</div>
                <div style={{ display: 'grid', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, borderBottom: '1px solid #F8FAFC', paddingBottom: 6 }}>
                    <span style={{ color: '#64748B' }}>Material Grade</span>
                    <span style={{ fontWeight: 700, color: '#1C1C72' }}>M25 / Fe500D</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, borderBottom: '1px solid #F8FAFC', paddingBottom: 6 }}>
                    <span style={{ color: '#64748B' }}>Safety Factor</span>
                    <span style={{ fontWeight: 700, color: '#1C1C72' }}>1.5 (IS 456:2000)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, borderBottom: '1px solid #F8FAFC', paddingBottom: 6 }}>
                    <span style={{ color: '#64748B' }}>Exposure</span>
                    <span style={{ fontWeight: 700, color: '#1C1C72' }}>Moderate</span>
                  </div>
                </div>
              </div>

              <div style={{ 
                padding: '24px', 
                background: '#1C1C72', 
                borderRadius: 24, 
                color: '#fff',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', bottom: -10, right: -10, opacity: 0.1 }}>
                  <ShieldCheck size={80} />
                </div>
                <div style={{ fontSize: 10, fontWeight: 900, color: '#A5B4FC', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Engineering Verdict</div>
                <p style={{ fontSize: 10, opacity: 0.8, lineHeight: 1.5 }}>
                  The computed values align with Agnaa's high-efficiency structural protocols. Optimized for maximum durability and material conservation.
                </p>
                <div style={{ marginTop: 16, height: 1.5, background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ marginTop: 12, fontSize: 10, fontWeight: 800 }}>STATUS: APPROVED FOR ESTIMATION</div>
              </div>
            </div>
            
            <div style={{ 
              padding: '16px 20px', 
              background: 'rgba(28, 28, 114, 0.03)', 
              borderRadius: 16, 
              border: '1px dashed #A5B4FC' 
            }}>
              <div style={{ fontSize: 9, fontWeight: 900, color: '#1C1C72', marginBottom: 4 }}>ARCHITECTURAL NOTICE</div>
              <div style={{ fontSize: 8, color: '#64748B', lineHeight: 1.4 }}>
                This dossier is a living document. Any modification to parameters requires a full re-validation of the structural model. Consult Agnaa Design Studio for final GFC (Good For Construction) drawings.
              </div>
            </div>
          </div>


          <Footer />
        </div>
      )}
    </div>
  );
};
