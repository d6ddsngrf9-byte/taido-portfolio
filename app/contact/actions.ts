'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContact(formData: FormData) {
  const name = (formData.get('name') as string).trim();
  const email = (formData.get('email') as string).trim();
  const message = (formData.get('message') as string).trim();

  if (!name || !email || !message) {
    return { error: '必須項目を入力してください' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'メールアドレスの形式が正しくありません' };
  }

  try {
    await resend.emails.send({
      from: 'taido.design <onboarding@resend.dev>',
      to: 'hello@taido.design',
      replyTo: email,
      subject: `[taido.design] ${name} さんからのお問い合わせ`,
      text: `名前: ${name}\nメール: ${email}\n\n${message}`,
    });

    return { success: true };
  } catch {
    return { error: '送信に失敗しました。しばらく経ってから再度お試しください。' };
  }
}
