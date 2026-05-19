export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.04)',
      padding: '60px 0 40px',
      background: 'var(--bg-secondary)',
    }}>
      <div className="qm-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr',
          gap: '48px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px',
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '7px',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 700,
                color: '#fff',
                fontFamily: 'var(--font-display)',
              }}>Q</div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
              }}>QueryMind</span>
            </div>
            <p style={{
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: '340px',
            }}>
              AI-powered natural language to SQL engine. Built with RAG,
              semantic schema, few-shot learning, and human-in-the-loop safety
              for accurate, production-ready query generation.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px',
            }}>Tech Stack</h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              {[
                'Python 3.11+ · FastAPI',
                'LangChain · LCEL Pipeline',
                'OpenAI GPT-4o · Embeddings',
                'ChromaDB · Vector Store',
                'SQLAlchemy · SQLite',
                'React 18 · TypeScript · Vite',
              ].map((item) => (
                <span key={item} style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px',
            }}>Resources</h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              {[
                { label: 'GitHub Repository', href: 'https://github.com/ridash2005/SQL-Query-Generator' },
                { label: 'Olist Dataset', href: 'https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce' },
                { label: 'LangChain Docs', href: 'https://www.langchain.com/' },
                { label: 'OpenAI Platform', href: 'https://platform.openai.com/' },
                { label: 'ChromaDB Docs', href: 'https://www.trychroma.com/' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    transition: 'color 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-violet)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          paddingTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <span style={{
            fontSize: '13px',
            color: 'var(--text-tertiary)',
          }}>
            © {new Date().getFullYear()} Rickarya Das · MIT License
          </span>
          <span style={{
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-tertiary)',
          }}>
            Built with ♥ and too much caffeine
          </span>
        </div>
      </div>
    </footer>
  )
}
