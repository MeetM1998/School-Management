const forgotPasswordEmailTemplate = (data) => {
  return `
   <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Reset Your Password for school management</title>
                <style>
                    body {
                        font - family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    }
                    .container {
                    padding: 20px;
                    max-width: 600px;
                    margin: 0 auto;
                    border: 1px solid #ddd;
                    }
                    p {
                        line - height: 1.5;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h3>Reset Your Password for school management</h3>
                    <p>Hi ${data?.name},</p>
                    <p>You recently requested to reset your password for your school management account.</p>
                    <p>Here's a one-time code (OTP) to help you reset your password:</p>
                    <p style="font-weight: bold;">${data?.otp}</p>
                    <p>This code is valid for 60 seconds.</p>
                    <p>Sincerely,</p>
                    <p>school management</p>
                </div>
            </body>
        </html>
    `;
};

export { forgotPasswordEmailTemplate };
