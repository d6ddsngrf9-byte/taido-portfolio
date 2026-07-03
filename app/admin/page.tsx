'use client';

import { useState, useRef } from 'react';
import { addWork } from './actions';
import { CATEGORIES } from '@/lib/categories';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; error?: string; id?: string } | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const fontStyle = { fontFamily: "'Optima', 'Optima Nova', Candara, sans-serif" };

  const handlePwSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwInput === 'T32j4ghb') {
      setAuthed(true);
    } else {
      setPwError('パスワードが違います');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    const fd = new FormData(e.currentTarget);
    fd.set('password', 'T32j4ghb');
    const res = await addWork(fd);
    setResult(res);
    setSubmitting(false);
    if (res.success) {
      formRef.current?.reset();
      setPreviews([]);
    }
  };

  if (!authed) {
    return (
      <div style={{ ...fontStyle, minHeight: '100vh', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handlePwSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '280px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#888', marginBottom: '4px' }}>ADMIN</p>
          <input
            type="password"
            placeholder="パスワード"
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            style={inputStyle}
            autoFocus
          />
          {pwError && <p style={{ fontSize: '11px', color: '#c00' }}>{pwError}</p>}
          <button type="submit" style={btnStyle}>入る</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ ...fontStyle, minHeight: '100vh', background: '#fafafa', padding: '40px 24px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#888', marginBottom: '32px' }}>WORKS 追加</p>

        <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <label style={labelStyle}>
            クライアント名 <span style={{ color: '#c00' }}>*</span>
            <input name="client" required style={inputStyle} placeholder="むすびばな" />
          </label>

          <label style={labelStyle}>
            年号 <span style={{ color: '#c00' }}>*</span>
            <input name="year" required style={inputStyle} placeholder="2024" maxLength={4} />
          </label>

          <label style={labelStyle}>
            やったこと <span style={{ color: '#c00' }}>*</span>
            <textarea name="description" required style={{ ...inputStyle, height: '80px', resize: 'vertical' }} placeholder="ロゴ・名刺・パンフレットデザイン" />
          </label>

          <label style={labelStyle}>
            カテゴリ <span style={{ color: '#c00' }}>*</span>
            <select name="category" required style={inputStyle}>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.ja}</option>
              ))}
            </select>
          </label>

          <label style={labelStyle}>
            ID（英数字・ハイフン。空白で自動生成）
            <input name="id" style={inputStyle} placeholder="branding-musubi" pattern="[a-zA-Z0-9-]*" />
          </label>

          <label style={labelStyle}>
            画像（複数可）
            <input
              name="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: '8px', fontSize: '12px', color: '#555' }}
            />
          </label>

          {previews.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {previews.map((src, i) => (
                <img key={i} src={src} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '2px' }} />
              ))}
            </div>
          )}

          <button type="submit" disabled={submitting} style={{ ...btnStyle, marginTop: '8px' }}>
            {submitting ? '保存中…' : '登録する'}
          </button>

          {result?.success && (
            <p style={{ fontSize: '12px', color: '#3a5545' }}>登録しました（id: {result.id}）</p>
          )}
          {result?.error && (
            <p style={{ fontSize: '12px', color: '#c00' }}>{result.error}</p>
          )}
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  marginTop: '6px',
  padding: '8px 10px',
  fontSize: '13px',
  border: '1px solid #ddd',
  borderRadius: '2px',
  background: 'white',
  outline: 'none',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  letterSpacing: '0.08em',
  color: '#888',
};

const btnStyle: React.CSSProperties = {
  padding: '10px 24px',
  background: '#3a5545',
  color: 'white',
  border: 'none',
  borderRadius: '2px',
  fontSize: '12px',
  cursor: 'pointer',
  letterSpacing: '0.08em',
};
