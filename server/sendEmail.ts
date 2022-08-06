import axios from "axios";

import * as dotenv from 'dotenv';
dotenv.config();

const data = {
  service_id: process.env.EMAILJS_SERVICE_ID,
  template_id: process.env.EMAILJS_TEMPLATE_ID,
  user_id: process.env.EMAILJS_PUBLIC_KEY,
  template_params: {
    'to_name': 'John Cena',
    'to_mail': 'JohnCenaBulking@gmail.com'
  }
}

export async function sendEmail() {
  try {
    const xd = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
    console.log(xd)
  } catch (e) {
    console.log(e)
  }
}
