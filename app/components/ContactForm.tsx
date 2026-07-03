'use client';

import { useState } from 'react';
import { sendContact } from '@/app/contact/actions';

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    const fd = new FormData(e.currentTarget);
    const res = await sendContact(fd);
    setResult(res);
    setSubmitting(false);
    if (res.success) e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <label style={labelStyle}>
        お名前 <span style={{ color: '#c00' }}>*</span>
        <input name="name" required style={inputStyle} placeholder="山田 花子" />
      </label>
      <label style={labelStyle}>
        メールアドレス <span style={{ color: '#c00' }}>*</span>
        <input name="email" type="email" required style={inputStyle} placeholder="hello@example.com" />
      </label>
      <label style={labelStyle}>
        お問い合わせ内容 <span style={{ color: '#c00' }}>*</span>
        <textarea name="message" required rows={5} style={{ ...inputStyle, resize: 'vertical' }} placeholder="ご依頼・ご相談の内容をお書きください" />
      </label>

      <button
        type="submit"
        disabled={submitting}
        style={{
          padding: '10px 28px',
          background: '#3a5545',
          color: 'white',
          border: 'none',
          borderRadius: '2px',
          fontSize: '12px',
          letterSpacing: '0.08em',
          cursor: submitting ? 'not-allowed' : 'pointer',
          opacity: submitting ? 0.6 : 1,
          alignSelf: 'flex-start',
        }}
      >
        {submitting ? '送信中…' : '送信する'}
      </button>

      {result?.success && (
        <p style={{ fontSize: '12px', color: '#3a5545', letterSpacing: '0.06em' }}>
          送信しました。3〜5営業日以内にご返信します。
        </p>
      )}
      {result?.error && (
        <p style={{ fontSize: '12px', color: '#c00' }}>{result.error}</p>
      )}
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  marginTop: '6px',
  padding: '9px 10px',
  fontSize: '13px',
  border: '1px solid #ddd',
  borderRadius: '2px',
  outline: 'none',
  fontFamily: 'inherit',
  color: '#111',
  background: 'white',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  letterSpacing: '0.08em',
  color: '#888',
};
