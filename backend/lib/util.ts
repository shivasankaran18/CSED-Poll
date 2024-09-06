import nodemailer from "nodemailer"


export function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp
}


export const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.email, 
      pass: process.env.password   
    }
  });


  
export function changeMailPortion(email:string,otp:number)
{
    let mailOptions = {
        from: process.env.email,    // Sender's email address
        to: email, // Recipient's email address
        subject: 'Change Passowrd For CSED Poll', // Subject line

        html:`
  <!DOCTYPE html>
  <html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
      }
      .header {
        background-color: #4CAF50;
        padding: 20px;
        text-align: center;
        color: #ffffff;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .body {
        padding: 20px;
        text-align: center;
        color: #333333;
      }
      .otp {
        display: inline-block;
        background-color: #f9f9f9;
        border: 2px dashed #4CAF50;
        padding: 15px;
        font-size: 32px;
        color: #333333;
        letter-spacing: 5px;
        margin-bottom: 20px;
      }
      .footer {
        background-color: #f4f4f4;
        padding: 20px;
        text-align: center;
        font-size: 12px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <table role="presentation" cellpadding="0" cellspacing="0" class="email-container">
      <tr>
        <td>
          <div class="header">
            <h1>Your OTP Code</h1>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="body">
            <p>Your One-Time Password (OTP) for completing your action is:</p>
            <div class="otp">${otp}</div>
            <p>Please use this code within the next 10 minutes. Do not share this OTP with anyone.</p>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="footer">
            <p>If you did not request this OTP, please contact support.</p>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
      };
      return mailOptions


      
}


export function pollMailPortion(email:string, title:string,name:string){
    let mailOptions={
        from:process.env.email,
        to:email,
        subject:"New Poll Created",

        html:`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>New Poll Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #0056b3;
            color: #ffffff;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .email-body h2 {
            font-size: 22px;
            margin-bottom: 10px;
        }
        .email-body p {
            margin: 0;
            font-size: 16px;
        }
        .email-footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 14px;
            color: #777777;
            border-radius: 0 0 8px 8px;
        }
        .email-footer a {
            color: #0056b3;
            text-decoration: none;
        }
        .button {
            display: inline-block;
            background-color: #0056b3;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #004299;
        }
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100%;
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
            <h1>New Poll Notification</h1>
        </div>

        <!-- Email Body -->
        <div class="email-body">
            <h2>Hello ${name},</h2>
            <p>Your advisor, has created a new poll titled <strong>"${title}"</strong>.</p>
            <p>Please take a moment to participate in the poll by clicking the link below:</p>

       

            <p>If you have any questions or need assistance, feel free to reach out to your advisor.</p>
        </div>

        <!-- Email Footer -->
        <div class="email-footer">
            <p>Thank you,

        </div>
    </div>
</body>
</html>`
    }


    return mailOptions


}

const now = new Date();

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});


const [{ value: day },,{ value: month },,{ value: year },,{ value: hour },,{ value: minute },,{ value: second }] = formatter.formatToParts(now);


export const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);

