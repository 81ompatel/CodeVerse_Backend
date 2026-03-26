const mailer = require("nodemailer")
require("dotenv").config()

const mailSend = async (to, subject, username) => {

    const transporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    // Inline HTML template
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
                            <td style="background:#4f46e5; color:#fff; padding:20px; text-align:center;">
                                <h1 style="margin:0;">🚀 CodeVerse</h1>
                                <p style="margin:5px 0 0;">Online Hackathon Platform</p>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding:30px; color:#333;">
                                <h2>Welcome, ${username} 👋</h2>

                                <p>
                                    We're excited to have you join <strong>CodeVerse</strong> — your gateway to hackathons and innovation!
                                </p>

                                <p>
                                    Start exploring hackathons, build projects, and showcase your skills.
                                </p>

                                <div style="text-align:center; margin:30px 0;">
                                    <a href="https://yourwebsite.com"
                                       style="background:#4f46e5; color:#fff; padding:12px 25px; text-decoration:none; border-radius:5px;">
                                        Explore Platform
                                    </a>
                                </div>

                                <p>
                                    Happy Coding 💻🔥<br>
                                    <strong>Team CodeVerse</strong>
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="background:#f1f1f1; text-align:center; padding:15px; font-size:12px; color:#777;">
                                © 2026 CodeVerse. All rights reserved.
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

    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse
}

module.exports = mailSend