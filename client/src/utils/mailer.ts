import { Resend } from "resend";

export const buildEmailText = (name: string, email: string, query: string) => `
Вам пришло сообщение с сайта gameaccent.com!

<br />
<br />

От: ${name}

<br />

Эл. адрес: ${email}

<br />

Сообщение:

<br />

${query}
`;

export const sendMail = (text: string) => {
  const resend = new Resend(process.env.RESEND_KEY);

  return resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env.EMAIL_TO_ADDRESS as string,
    subject: "Mail from GameAccent portal",
    html: text,
  });
};
