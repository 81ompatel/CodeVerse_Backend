const mailer = require("nodemailer")
require("dotenv").config()

const resetPasswordMailSend = async (to, subject, resetLink, username) => {

    const transporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">

        <table width="100%" style="padding:20px;">
            <tr>
                <td align="center">

                    <table width="600" style="background:#ffffff; border-radius:10px; overflow:hidden;">
                        
                        <!-- Header -->
                        <tr>
                            <td style="background:#0b4f6c; color:#fff; padding:20px; text-align:center;">
                                <h1 style="margin:0;">🚀 CodeVerse</h1>
                                <p style="margin:5px 0 0;">Password Reset Request</p>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding:30px; color:#333;">
                                <h2>Hello, ${username || 'User'} 👋</h2>

                                <p>
                                    You are receiving this email because you (or someone else) have requested the reset of the password for your CodeVerse account.
                                </p>

                                <p>
                                    Please click on the following link, or paste it into your browser to complete the process:
                                </p>

                                <div style="text-align:center; margin:30px 0;">
                                    <a href="${resetLink}"
                                       style="background:#0b4f6c; color:#fff; padding:12px 25px; text-decoration:none; border-radius:5px;">
                                        Reset Password
                                    </a>
                                </div>
                                
                                <p style="color: #ef4444; font-size: 0.9em;">
                                    This link will expire in 1 hour. If you did not request this, please ignore this email and your password will remain unchanged.
                                </p>

                                <p>
                                    Thank you,<br>
                                    <strong>Team CodeVerse</strong>
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background:#f1f1f1; text-align:center; padding:15px; font-size:12px; color:#777;">
                                © ${new Date().getFullYear()} CodeVerse. All rights reserved.
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    `

    const mailOptions = {
        to: to,
        subject: subject,
        html: htmlTemplate
    }

    try {
        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse
    } catch (err) {
        console.log("Error sending reset password email: ", err)
        throw err
    }
}

module.exports = resetPasswordMailSend
