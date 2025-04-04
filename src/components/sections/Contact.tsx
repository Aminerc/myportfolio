import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";

const INITIAL_STATE = Object.fromEntries(
  Object.keys(config.contact.form).map((input) => [input, ""])
);

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

console.log("Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
console.log("Template ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
console.log("Public key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (e === undefined) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    if (e === undefined) return;
    e.preventDefault();
    setLoading(true);
  
    emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      {
        form_name: form.name, //nom de l'expédieteur
        to_name: config.html.fullName, //Amine Ouardi
        from_email: form.email, // l'email de l'expéditeur
        to_email: "aminerc.business@outlook.com", // votre email pour recevoir les messages
        user_email: form.email, // l'adresse que le serveur prendra pour envoyer la réponse automatique
        message: form.message, //message de l'expéditeur
      },
      emailjsConfig.publicKey
    )
      .then(
        () => {
          setLoading(false);
          alert("Merci, votre demande a bien été envoyée.");
  
          setForm(INITIAL_STATE);
        },
        (error) => {
          setLoading(false);
  
          console.log(error);
          alert("Impossible d'envoyer votre message, veuillez vérifier les informations saisies ou réessayez ultérieurement");
        }
      );
  };

  return (
    <div
      className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="bg-black-100 flex-[0.75] rounded-2xl p-8"
      >
        <Header useMotion={false} {...config.contact} />

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          {Object.keys(config.contact.form).map((input) => {
            const { span, placeholder } =
              config.contact.form[input as keyof typeof config.contact.form];
            const Component = input === "message" ? "textarea" : "input";

            return (
              <label key={input} className="flex flex-col">
                <span className="mb-4 font-medium text-white">{span}</span>
                <Component
                  type={input === "email" ? "email" : "text"}
                  name={input}
                  value={form[`${input}`]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
                  {...(input === "message" && { rows: 7 })}
                />
              </label>
            );
          })}
          <button
            type="submit"
            className="bg-tertiary shadow-primary w-fit rounded-xl px-8 py-3 font-bold text-white shadow-md outline-none"
          >
            {loading ? "En cours d'envoi" : "Envoyer"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};
export default SectionWrapper(Contact, "contact");
