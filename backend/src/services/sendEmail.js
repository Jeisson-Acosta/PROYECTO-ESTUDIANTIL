import { MailerooClient, EmailAddress } from 'maileroo-sdk'

const client = new MailerooClient(process.env.MAILEROO_API_KEY)

export async function sendEmail({ toEmail, subject, html, text, attachments = [] }) {

    const recipients = toEmail.split('|').map((email) => new EmailAddress(email))

    const responseSendEmail = await client.sendBasicEmail({
        from: new EmailAddress(process.env.FROM_EMAIL_MAILEROO, "CEFCOC APP"),
        to: recipients,
        subject: subject,
        text: text,
        html: html
    })
    
    if (!responseSendEmail) {
        return { ok: false, message: 'Error al enviar el email' }
    }

    return { ok: true, message: 'Email enviado exitosamente' }
}