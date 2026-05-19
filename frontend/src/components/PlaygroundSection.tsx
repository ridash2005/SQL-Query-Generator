import { useState, useEffect } from 'react'
import ChatWindow from './ChatWindow'
import SchemaExplorer from './SchemaExplorer'
import ApprovalModal from './ApprovalModal'
import { getSchema, postApprove, type SchemaTable, type QueryResponse } from '../api'

export interface Message {
  id: string
  type: 'question' | 'answer' | 'error'
  content: QueryResponse | string
  timestamp: Date
}

const EXAMPLE_QUERIES = [
  'What are the top 10 product categories by revenue?',
  'Which states have the most canceled orders?',
  'Average review score by product category',
  'Monthly revenue trend for the last 12 months',
  'Top 5 sellers by total sales volume',
]

export default function PlaygroundSection() {
  const [messages, setMessages] = useState<Message[]>([])
  const [schema, setSchema] = useState<SchemaTable[]>([])
  const [activeTables, setActiveTables] = useState<string[]>([])
  const [pendingApproval, setPendingApproval] = useState<QueryResponse | null>(null)
  const [exampleQuery, setExampleQuery] = useState<string | null>(null)

  useEffect(() => {
    getSchema()
      .then(setSchema)
      .catch((err) => console.error('Failed to load schema:', err))
  }, [])

  const handleAnswer = (response: QueryResponse) => {
    if (response.requires_approval) {
      setPendingApproval(response)
    }
    setActiveTables(response.tables_used)
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: 'answer',
        content: response,
        timestamp: new Date(),
      },
    ])
  }

  const handleApprove = async (approved: boolean) => {
    if (!pendingApproval) return
    try {
      const result = await postApprove(pendingApproval.sql, approved)
      const updatedResponse: QueryResponse = {
        ...pendingApproval,
        results: result.results,
        requires_approval: false,
      }
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          type: 'answer',
          content: updatedResponse,
          timestamp: new Date(),
        },
      ])
    } catch (err) {
      console.error('Approval failed:', err)
    } finally {
      setPendingApproval(null)
    }
  }

  return (
    <section id="playground" className="qm-section">
      <div className="qm-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="qm-badge" style={{
            marginBottom: '16px',
            display: 'inline-flex',
          }}>
            ✦ Interactive Demo
          </div>
          <h2 className="qm-section-title" style={{ textAlign: 'center' }}>
            Try It{' '}
            <span className="qm-gradient-text">Live.</span>
          </h2>
          <p className="qm-section-subtitle" style={{
            textAlign: 'center',
            margin: '0 auto',
          }}>
            Ask any question about the Olist Brazilian E-Commerce dataset.
            The playground connects to the live backend and returns real results.
          </p>
        </div>

        {/* Playground container */}
        <div className="qm-playground">
          {/* Sidebar */}
          <div className="qm-playground-sidebar">
            <div style={{
              padding: '14px 16px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                color: '#fff',
                fontFamily: 'var(--font-display)',
              }}>Q</div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-violet)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.03em',
              }}>
                QUERYMIND
              </span>
            </div>
            <SchemaExplorer schema={schema} activeTables={activeTables} />
          </div>

          {/* Main area */}
          <div className="qm-playground-main">
            {/* Example query chips */}
            <div className="qm-example-chips">
              <span style={{
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-mono)',
                marginRight: '4px',
                alignSelf: 'center',
              }}>
                Try:
              </span>
              {EXAMPLE_QUERIES.map((q) => (
                <button
                  key={q}
                  className="qm-chip"
                  onClick={() => setExampleQuery(q)}
                >
                  {q.length > 40 ? q.slice(0, 37) + '...' : q}
                </button>
              ))}
            </div>

            {/* Chat interface */}
            <ChatWindow
              messages={messages}
              setMessages={setMessages}
              onAnswer={handleAnswer}
              injectedQuery={exampleQuery}
              onQueryConsumed={() => setExampleQuery(null)}
            />
          </div>
        </div>
      </div>

      {/* Approval modal */}
      {pendingApproval && (
        <ApprovalModal
          sql={pendingApproval.sql}
          reason={pendingApproval.approval_reason || ''}
          onApprove={() => handleApprove(true)}
          onReject={() => setPendingApproval(null)}
        />
      )}
    </section>
  )
}
