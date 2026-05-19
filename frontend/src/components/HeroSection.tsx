import { useState, useEffect } from 'react'

const DEMO_STEPS = [
  { type: 'prompt', text: '> What are the top 5 product categories by revenue?' },
  { type: 'status', text: '✓ Retrieved: fact_orders, dim_products' },
  { type: 'sql', lines: [
    'SELECT p.category_name,',
    '       SUM(o.order_total_usd) AS total_revenue',
    'FROM   fact_orders o',
    'JOIN   dim_products p ON o.product_id = p.product_id',
    'WHERE  o.order_status = \'delivered\'',
    'GROUP  BY p.category_name',
    'ORDER  BY total_revenue DESC',
    'LIMIT  5;',
  ]},
  { type: 'result', rows: [
    ['health_beauty',      '$1,243,187'],
    ['watches_gifts',      '$1,101,440'],
    ['bed_bath_table',     '$1,038,621'],
    ['sports_leisure',     '$987,234'],
    ['computers_accessories', '$912,017'],
  ]},
]

export default function HeroSection() {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1200),
      setTimeout(() => setStep(2), 2200),
      setTimeout(() => setStep(3), 4000),
    ]
    const loop = setTimeout(() => setStep(0), 8500)
    const restart = setTimeout(() => {
      setStep(0)
      // Re-trigger the animation cycle
      const t1 = setTimeout(() => setStep(1), 1200)
      const t2 = setTimeout(() => setStep(2), 2200)
      const t3 = setTimeout(() => setStep(3), 4000)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }, 9000)
    return () => { timers.forEach(clearTimeout); clearTimeout(loop); clearTimeout(restart) }
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 'var(--nav-height)',
    }}>
      {/* Background gradient orbs */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '20%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      <div className="qm-container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        width: '100%',
      }}>
        {/* Left: Copy */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div className="qm-badge" style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '12px' }}>✦</span>
            RAG-Powered · GPT-4o · Real-Time Results
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4.5vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
          }}>
            From Questions{' '}
            <br />
            <span className="qm-gradient-text">to Queries,</span>
            <br />
            Instantly.
          </h1>

          <p style={{
            fontSize: '17px',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            marginBottom: '36px',
          }}>
            Ask questions in plain English. QueryMind uses retrieval-augmented generation
            and a semantic schema layer to write precise SQL and return real results —
            no SQL knowledge required.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a href="#playground" className="qm-btn-primary">
              Try the Playground
              <span>↓</span>
            </a>
            <a href="#features" className="qm-btn-secondary">
              How It Works
            </a>
          </div>
        </div>

        {/* Right: Animated terminal */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(40px)',
          transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
        }}>
          <div className="qm-terminal" style={{ animation: 'glow 4s ease-in-out infinite' }}>
            <div className="qm-terminal-header">
              <div className="qm-terminal-dot" style={{ background: '#ff5f56' }} />
              <div className="qm-terminal-dot" style={{ background: '#ffbd2e' }} />
              <div className="qm-terminal-dot" style={{ background: '#27c93f' }} />
              <span style={{
                marginLeft: '8px',
                fontSize: '12px',
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-mono)',
              }}>
                querymind — live demo
              </span>
            </div>
            <div className="qm-terminal-body">
              {/* Step 0: Question */}
              <div style={{
                opacity: step >= 0 ? 1 : 0,
                transition: 'opacity 0.5s',
                marginBottom: '12px',
              }}>
                <span style={{ color: 'var(--accent-violet)' }}>{DEMO_STEPS[0].text}</span>
              </div>

              {/* Step 1: Schema retrieval */}
              {step >= 1 && (
                <div style={{
                  animation: 'fadeIn 0.4s ease',
                  marginBottom: '12px',
                  color: 'var(--accent-green)',
                  fontSize: '12px',
                }}>
                  {DEMO_STEPS[1].text}
                </div>
              )}

              {/* Step 2: SQL */}
              {step >= 2 && (
                <div style={{
                  animation: 'fadeIn 0.5s ease',
                  marginBottom: '12px',
                  padding: '12px',
                  background: 'rgba(99, 102, 241, 0.06)',
                  borderRadius: '6px',
                  border: '1px solid rgba(99, 102, 241, 0.12)',
                }}>
                  {DEMO_STEPS[2].lines!.map((line, i) => (
                    <div key={i} style={{
                      opacity: step >= 2 ? 1 : 0,
                      animation: `fadeIn 0.3s ease ${i * 0.08}s both`,
                      color: line.match(/^(SELECT|FROM|JOIN|WHERE|GROUP|ORDER|LIMIT)/i)
                        ? 'var(--accent-cyan)'
                        : line.includes('AS') || line.includes('ON') || line.includes('DESC')
                          ? 'var(--accent-violet)'
                          : 'var(--text-primary)',
                      fontSize: '12px',
                      lineHeight: '1.8',
                    }}>
                      {line}
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Results */}
              {step >= 3 && (
                <div style={{ animation: 'fadeInUp 0.5s ease' }}>
                  <div style={{
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    marginBottom: '6px',
                  }}>
                    ✓ 5 rows · 42ms
                  </div>
                  <div style={{
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      fontSize: '11px',
                    }}>
                      <div style={{
                        padding: '6px 10px',
                        background: 'rgba(255,255,255,0.03)',
                        color: 'var(--text-secondary)',
                        fontWeight: 600,
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                      }}>category_name</div>
                      <div style={{
                        padding: '6px 10px',
                        background: 'rgba(255,255,255,0.03)',
                        color: 'var(--text-secondary)',
                        fontWeight: 600,
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        textAlign: 'right',
                      }}>total_revenue</div>
                      {DEMO_STEPS[3].rows!.map(([cat, rev], i) => (
                        <div key={i} style={{ display: 'contents' }}>
                          <div style={{
                            padding: '5px 10px',
                            color: 'var(--text-primary)',
                            borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.02)' : 'none',
                            animation: `fadeIn 0.3s ease ${i * 0.06}s both`,
                          }}>{cat}</div>
                          <div style={{
                            padding: '5px 10px',
                            color: 'var(--accent-cyan)',
                            textAlign: 'right',
                            borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.02)' : 'none',
                            animation: `fadeIn 0.3s ease ${i * 0.06}s both`,
                          }}>{rev}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
        <div className="qm-container">
          <div className="qm-stats" style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
            marginBottom: '40px',
          }}>
            {[
              { value: '6', label: 'Star-Schema Tables', color: 'var(--accent-violet)' },
              { value: '100K+', label: 'Real E-Commerce Orders', color: 'var(--accent-cyan)' },
              { value: '<500ms', label: 'Average Latency', color: 'var(--accent-green)' },
              { value: 'GPT-4o', label: 'Language Model', color: 'var(--accent-yellow)' },
            ].map((stat) => (
              <div key={stat.label} className="qm-stat">
                <div className="qm-stat-value" style={{ color: stat.color }}>{stat.value}</div>
                <div className="qm-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
