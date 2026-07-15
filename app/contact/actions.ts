'use server';

import { Resend } from 'resend';
import { headers } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);

// 簡易レート制限（同一IPあたり 10分で5回まで）。サーバーインスタンス単位のメモリ。
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX;
}

export async function sendContact(formData: FormData) {
  // ハニーポット：人間は空。埋まっていればbotとみなし、成功を装って無視する。
  const honeypot = ((formData.get('website') as string) ?? '').trim();
  if (honeypot) return { success: true };

  const name = ((formData.get('name') as string) ?? '').trim();
  const email = ((formData.get('email') as string) ?? '').trim();
  const message = ((formData.get('message') as string) ?? '').trim();
  const company = ((formData.get('company') as string) ?? '').trim();
  const timing = ((formData.get('timing') as string) ?? '').trim();
  const budget = ((formData.get('budget') as string) ?? '').trim();
  const source = ((formData.get('source') as string) ?? '').trim();

  if (!name || !email || !message) {
    return { error: '必須項目を入力してください' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'メールアドレスの形式が正しくありません' };
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return { error: '入力が長すぎます。内容を短くしてお試しください。' };
  }

  // レート制限（IPは信頼できる x-forwarded-for の先頭）
  const h = await headers();
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return { error: '送信が集中しています。しばらく経ってから再度お試しください。' };
  }

  const meta = [
    `名前: ${name}`,
    `メール: ${email}`,
    ...(company ? [`会社・団体: ${company}`] : []),
    ...(timing ? [`希望時期: ${timing}`] : []),
    ...(budget ? [`予算感: ${budget}`] : []),
    ...(source ? [`きっかけ: ${source}`] : []),
  ];

  try {
    await resend.emails.send({
      from: 'taido.design <noreply@taido.design>',
      to: 'hello@taido.design',
      replyTo: email,
      subject: `[taido.design] ${name} さんからのお問い合わせ`,
      text: `${meta.join('\n')}\n\n${message}`,
    });
    return { success: true };
  } catch {
    return { error: '送信に失敗しました。しばらく経ってから再度お試しください。' };
  }
}
