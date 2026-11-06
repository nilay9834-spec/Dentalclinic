"use client";
import {useState} from "react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || "919876543210";

export default function BookingForm(){
  const [sent,setSent]=useState(false);
  function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const f=new FormData(e.currentTarget);
    if(f.get("website"))return;
    const msg=[
      "Hello SmileCare, I would like to request an appointment.",
      `Name: ${f.get("name")}`,
      `Phone: ${f.get("phone")}`,
      `Service: ${f.get("concern")}`,
      `Preferred day: ${f.get("preferredDay")}`,
      `Preferred time: ${f.get("preferredTime")}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener");
    setSent(true);
    e.currentTarget.reset();
  }
  return <form className="booking-form" onSubmit={submit}><div className="formrow"><label>Your name<input name="name" placeholder="Full name" required minLength={2}/></label><label>Phone number<input name="phone" placeholder="10-digit mobile number" inputMode="numeric" pattern="[6-9][0-9]{9}" required/></label></div><div className="formrow"><label>What would you like help with?<select name="concern" required defaultValue=""><option value="" disabled>Select a service</option><option>General checkup & cleaning</option><option>Tooth pain / Root canal</option><option>Dental implants</option><option>Braces / Aligners</option><option>Other / Not sure</option></select></label><label>Preferred day<input name="preferredDay" type="date" required min={new Date().toISOString().slice(0,10)}/></label></div><label>Preferred time<select name="preferredTime" defaultValue="Morning (9 AM–12 PM)"><option>Morning (9 AM–12 PM)</option><option>Afternoon (12 PM–4 PM)</option><option>Evening (4 PM–8 PM)</option></select></label><label className="consent"><input type="checkbox" name="consent" value="yes" required/> I agree that the clinic may contact me about this appointment request. <a href="/privacy">Privacy policy</a></label><input name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true"/><button className="btn">Send request on WhatsApp →</button>{sent&&<p className="success">WhatsApp has opened with your request. Press send there, and the clinic will contact you to confirm.</p>}<p className="fineprint">This is an appointment request, not a confirmed booking. Please do not submit medical history or sensitive health details.</p></form>
}
