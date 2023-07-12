import { createTransport } from "nodemailer";
import { CfgObject } from "../config/config.js";

const transport = createTransport({
  service: CfgObject.mail_service,
  port: CfgObject.mail_port,
  auth: {
    user: CfgObject.mail_user,
    pass: CfgObject.mail_password,
  },
});

const sendMail = async ({ userMail, subject, html, attachts }) => {
  try {
    return await transport.sendMail({
      from,
      to: userMail,
      subject,
      html,
      attachments: !attachts ? [] : attachts,
    });
  } catch (error) {}
};

export { sendMail };