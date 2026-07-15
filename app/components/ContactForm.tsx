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
      {/* ハニーポット（人間には見えない。botが埋めると弾く） */}
      <div aria-hidden="true" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}>
        <label>
          Webサイト
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label style={labelStyle}>
        お名前 <span style={reqStyle}>*</span>
        <input name="name" required aria-required="true" maxLength={100} autoComplete="name" style={inputStyle} placeholder="山田 花子" />
      </label>
      <label style={labelStyle}>
        メールアドレス <span style={reqStyle}>*</span>
        <input name="email" type="email" required aria-required="true" maxLength={200} autoComplete="email" style={inputStyle} placeholder="hello@example.com" />
      </label>
      <label style={labelStyle}>
        お問い合わせ内容 <span style={reqStyle}>*</span>
        <textarea name="message" required aria-required="true" maxLength={5000} rows={5} style={{ ...inputStyle, resize: 'vertical' }} placeholder="ご依頼・ご相談の内容をお書きください" />
      </label>

      <label style={labelStyle}>
        会社名・団体名 <span style={optStyle}>任意</span>
        <input name="company" maxLength={100} autoComplete="organization" style={inputStyle} placeholder="" />
      </label>
      <div style={{ display: 'flex', gap: '12px' }}>
        <label style={{ ...labelStyle, flex: 1 }}>
          希望時期 <span style={optStyle}>任意</span>
          <input name="timing" maxLength={60} style={inputStyle} placeholder="◯月頃 / 未定" />
        </label>
        <label style={{ ...labelStyle, flex: 1 }}>
          予算感 <span style={optStyle}>任意</span>
          <input name="budget" maxLength={60} style={inputStyle} placeholder="" />
        </label>
      </div>
      <label style={labelStyle}>
        taido.design を知ったきっかけ <span style={optStyle}>任意</span>
        <input name="source" maxLength={100} style={inputStyle} placeholder="Instagram / 紹介 / 検索 など" />
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

      <div aria-live="polite" role="status">
        {result?.success && (
          <p style={{ fontSize: '12px', color: '#3a5545', letterSpacing: '0.06em' }}>
            送信しました。3〜5営業日以内にご返信します。
          </p>
        )}
        {result?.error && (
          <p role="alert" style={{ fontSize: '12px', color: '#c00' }}>{result.error}</p>
        )}
      </div>
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

const reqStyle: React.CSSProperties = { color: '#c00' };
const optStyle: React.CSSProperties = { color: '#bbb', fontSize: '10px' };
