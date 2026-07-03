'use client';

import { useState, useRef } from 'react';
import { addWork, verifyPassword } from './actions';
import { CATEGORIES } from '@/lib/categories';

// 画像をブラウザ側で長辺1600px・JPEG(0.8)に圧縮する（アップロード前に軽量化）
async function resizeImage(file: File, maxDim = 1600, quality = 0.8): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvasが使えません');
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
  if (!blob) throw new Error('画像の変換に失敗しました');
  return blob;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; error?: string; id?: string } | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const fontStyle = { fontFamily: "'Optima', 'Optima Nova', Candara, sans-serif" };

  const handlePwSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    const res = await verifyPassword(pwInput);
    if (res.ok) {
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
    const form = e.currentTarget;
    setSubmitting(true);
    setResult(null);
    try {
      const fd = new FormData(form);
      fd.set('password', pwInput);
      // 画像はブラウザ側で1600pxに圧縮してから送る（アップロード容量制限を回避）
      fd.delete('images');
      const input = form.querySelector('input[name="images"]') as HTMLInputElement | null;
      for (const file of Array.from(input?.files ?? [])) {
        const resized = await resizeImage(file);
        const base = file.name.replace(/\.[^.]+$/, '') || 'image';
        fd.append('images', resized, `${base}.jpg`);
      }
      const res = await addWork(fd);
      setResult(res);
      if (res.success) {
        form.reset();
        setPreviews([]);
      }
    } catch (err) {
      setResult({ error: '送信に失敗しました：' + (err instanceof Error ? err.message : String(err)) });
    } finally {
      setSubmitting(false);
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
            <p style={{ fontSize: '12px', color: '#3a5545', lineHeight: 1.7 }}>
              登録しました（id: {result.id}）<br />
              サイトへの反映まで約1分お待ちください（自動で再ビルドされます）。
            </p>
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
