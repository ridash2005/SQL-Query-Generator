const STEPS = [
  {
    num: '01',
    icon: '💬',
    label: 'Question',
    detail: 'User types in plain English',
    color: 'var(--accent-violet)',
  },
  {
    num: '02',
    icon: '🔢',
    label: 'Embed',
    detail: 'text-embedding-3-small → 1536d vector',
    color: 'var(--accent-indigo)',
  },
  {
    num: '03',
    icon: '🗂️',
    label: 'Retrieve',
    detail: 'ChromaDB top-3 tables by cosine similarity',
    color: 'var(--accent-cyan)',
  },
  {
    num: '04',
    icon: '📝',
    label: 'Prompt',
    detail: 'Schema + few-shot examples + question',
    color: 'var(--accent-cyan)',
  },
  {
    num: '05',
    icon: '🤖',
    label: 'Generate',
    detail: 'GPT-4o (temperature=0) → SQL',
    color: 'var(--accent-green)',
  },
  {
    num: '06',
    icon: '🛡️',
    label: 'Guard',
    detail: 'HITL safety check on SQL keywords',
    color: 'var(--accent-yellow)',
  },
  {
    num: '07',
    icon: '⚡',
    label: 'Execute',
    detail: 'Run against SQLite → return rows',
    color: 'var(--accent-green)',
  },
]

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="qm-section">
      <div className="qm-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="qm-badge" style={{
            marginBottom: '16px',
            display: 'inline-flex',
          }}>
            ✦ Pipeline Architecture
          </div>
          <h2 className="qm-section-title" style={{ textAlign: 'center' }}>
            Seven Steps.{' '}
            <span className="qm-gradient-text">One Pipeline.</span>
          </h2>
          <p className="qm-section-subtitle" style={{
            textAlign: 'center',
            margin: '0 auto',
          }}>
            Every query flows through a deterministic LCEL pipeline — from natural
            language input to validated SQL results in under 500ms.
          </p>
        </div>

        {/* Pipeline visualization */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
          position: 'relative',
        }}>
          {/* Connector line */}
          <div style={{
            position: 'absolute',
            top: '36px',
            left: 'calc(100% / 14)',
            right: 'calc(100% / 14)',
            height: '2px',
            background: 'linear-gradient(90deg, var(--accent-violet), var(--accent-cyan), var(--accent-green))',
            opacity: 0.25,
            zIndex: 0,
          }} />

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="qm-pipeline-step"
              style={{
                animation: `fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s both`,
                zIndex: 1,
              }}
            >
              <div className="qm-pipeline-icon" style={{
                background: `${step.color}08`,
                borderColor: `${step.color}20`,
              }}>
                <span>{step.icon}</span>
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: step.color,
                  marginBottom: '4px',
                  letterSpacing: '0.05em',
                }}>
                  STEP {step.num}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '6px',
                }}>
                  {step.label}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4,
                }}>
                  {step.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack row */}
        <div style={{
          marginTop: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          flexWrap: 'wrap',
        }}>
          {[
            { name: 'FastAPI', color: '#009688' },
            { name: 'LangChain', color: '#1C3C3C' },
            { name: 'ChromaDB', color: '#FF6F00' },
            { name: 'OpenAI', color: '#412991' },
            { name: 'SQLAlchemy', color: '#D71F00' },
            { name: 'React', color: '#61DAFB' },
            { name: 'TypeScript', color: '#3178C6' },
          ].map((tech) => (
            <div key={tech.name} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '2px',
                background: tech.color,
              }} />
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
