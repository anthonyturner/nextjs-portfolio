'use server'
import { sendContactEmail } from '@/lib/contact-email'

export const sendEmail = async (
  formData: FormData
): Promise<{ error: string; data?: undefined } | { data: { id: string }; error?: undefined }> => {
  const result = await sendContactEmail({
    source: 'contact-form',
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!result.ok) {
    return { error: result.error }
  }
  return { data: { id: result.id } }
}
