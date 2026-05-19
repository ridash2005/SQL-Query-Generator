const FEATURES = [
  {
    icon: '📖',
    title: 'Semantic Layer',
    accent: 'var(--accent-violet)',
    description:
      'Every table and column is annotated with business-friendly descriptions — a data dictionary the LLM reads before writing SQL. It knows that order_total_usd means revenue, not freight.',
    tag: 'Context',
  },
  {
    icon: '🔎',
    title: 'RAG Retrieval',
    accent: 'var(--accent-cyan)',
    description:
      'Table descriptions are embedded into ChromaDB at startup. At query time, only the 3 most semantically relevant tables are retrieved and injected into the prompt — no context overflow.',
    tag: 'Precision',
  },
  {
    icon: '💡',
    title: 'Few-Shot Examples',
    accent: 'var(--accent-green)',
    description:
      'Curated question→SQL pairs teach the LLM the exact SQL dialect, join patterns, and aggregation idioms for this specific database. In-context learning at its best.',
    tag: 'Accuracy',
  },
  {
    icon: '🛡️',
    title: 'HITL Safety Guard',
    accent: 'var(--accent-yellow)',
    description:
      'Before any SQL executes, a safety scanner blocks dangerous keywords (INSERT, UPDATE, DELETE, DROP). Write operations require explicit human approval via a confirmation dialog.',
    tag: 'Security',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="qm-section" style={{ position: 'relative' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '600px',
        background: 'var(--gradient-glow)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
        opacity: 0.5,
      }} />

      <div className="qm-container" style={{ position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="qm-badge" style={{
            marginBottom: '16px',
            display: 'inline-flex',
          }}>
            ✦ Core Techniques
          </div>
          <h2 className="qm-section-title" style={{ textAlign: 'center' }}>
            Four Techniques.{' '}
            <span className="qm-gradient-text">Zero Hallucinations.</span>
          </h2>
          <p className="qm-section-subtitle" style={{
            textAlign: 'center',
            margin: '0 auto',
          }}>
            Instead of dumping the entire schema into the prompt, QueryMind uses
            a precision-engineered pipeline that eliminates noise and maximizes accuracy.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              className="qm-glass-card"
              style={{
                animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s both`,
              }}
            >
              {/* Icon + Tag */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${feat.accent}10`,
                  border: `1px solid ${feat.accent}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                }}>
                  {feat.icon}
                </div>
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: feat.accent,
                  padding: '3px 10px',
                  background: `${feat.accent}08`,
                  border: `1px solid ${feat.accent}20`,
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>
                  {feat.tag}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 600,
                marginBottom: '12px',
                letterSpacing: '-0.01em',
              }}>
                {feat.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '14px',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
              }}>
                {feat.description}
              </p>

              {/* Bottom accent line */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '32px',
                right: '32px',
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${feat.accent}30, transparent)`,
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
