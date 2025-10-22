// Email service for sending OTPs
// This is a mock implementation. Replace with real email service like SendGrid, Mailgun, etc.

/**
 * Send email verification OTP
 * @param {string} email - Recipient email
 * @param {string} otp - OTP code
 */
export const sendEmailVerificationOTP = async (email, otp) => {
  try {
    // Mock implementation - in production, integrate with actual email service
    console.log(`=== EMAIL VERIFICATION OTP ===`);
    console.log(`To: ${email}`);
    console.log(`Subject: NetworkAK Email Verification`);
    console.log(`Message: Your verification code is: ${otp}`);
    console.log(`Code valid for 10 minutes`);
    console.log(`================================`);

    // Uncomment and configure one of the following services in production:

    // SendGrid implementation
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL, // e.g., 'noreply@networkak.com'
      subject: 'NetworkAK Email Verification',
      text: `Your verification code is: ${otp}. This code is valid for 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to NetworkAK</h2>
          <p>Please verify your email address by entering the following code:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #007bff; font-size: 32px; margin: 0;">${otp}</h1>
          </div>
          <p>This code is valid for 10 minutes.</p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    */

    // You can also implement other services like:
    // - NodeMailer with SMTP
    // - AWS SES
    // - Mailgun
    // - etc.

    return true;
  } catch (error) {
    console.error('Failed to send email verification OTP:', error);
    throw new Error('Failed to send email verification OTP');
  }
};

/**
 * Send password reset OTP
 * @param {string} email - Recipient email
 * @param {string} otp - OTP code
 */
export const sendPasswordResetOTP = async (email, otp) => {
  try {
    // Mock implementation - in production, integrate with actual email service
    console.log(`=== PASSWORD RESET OTP ===`);
    console.log(`To: ${email}`);
    console.log(`Subject: NetworkAK Password Reset`);
    console.log(`Message: Your password reset code is: ${otp}`);
    console.log(`Code valid for 10 minutes`);
    console.log(`==========================`);

    // Uncomment and configure with actual email service in production

    return true;
  } catch (error) {
    console.error('Failed to send password reset OTP:', error);
    throw new Error('Failed to send password reset OTP');
  }
};

/**
 * Send welcome email after successful registration/verification
 * @param {string} email - Recipient email
 * @param {string} name - User name
 */
export const sendWelcomeEmail = async (email, name) => {
  try {
    // Mock implementation - in production, integrate with actual email service
    console.log(`=== WELCOME EMAIL ===`);
    console.log(`To: ${email}`);
    console.log(`Subject: Welcome to NetworkAK!`);
    console.log(`Message: Welcome ${name || 'user'}, your account has been verified!`);
    console.log(`=====================`);

    // Uncomment and configure with actual email service in production

    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw new Error('Failed to send welcome email');
  }
};

/**
 * Send payment confirmation email
 * @param {string} email - Recipient email
 * @param {Object} paymentData - Payment information
 */
export const sendPaymentConfirmationEmail = async (email, paymentData) => {
  try {
    // Mock implementation - in production, integrate with actual email service
    console.log(`=== PAYMENT CONFIRMATION ===`);
    console.log(`To: ${email}`);
    console.log(`Subject: Payment Confirmation - NetworkAK`);
    console.log(`Amount: $${paymentData.amount || 'N/A'}`);
    console.log(`Transaction ID: ${paymentData.transactionId || 'N/A'}`);
    console.log(`=============================`);

    // Uncomment and configure with actual email service in production

    return true;
  } catch (error) {
    console.error('Failed to send payment confirmation email:', error);
    throw new Error('Failed to send payment confirmation email');
  }
};
