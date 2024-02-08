import React, { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { Button } from "../Button/Button";
import { useTranslation } from "next-i18next";

type ContactData = {
  name: string;
  email: string;
  query: string;
};

export const ContactForm = () => {
  const { t } = useTranslation();

  const formRef = useRef<HTMLFormElement>(null);
  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    email: "",
    query: "",
  });

  const onChange = (key: keyof ContactData) => {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setContactData((current) => ({ ...current, [key]: e.target.value }));
  };

  const submit = (e: MouseEvent) => {
    const { current: form } = formRef;
    if (!form) return;
    const isValid = form.checkValidity();

    e.preventDefault();

    if (isValid) {
      fetch("/api/email", {
        method: "POST",
        body: JSON.stringify(contactData),
      }).then((response) => {
        if (!response.ok) alert(t("email-sent-error"));
        else alert(t("email-sent-success"));
      });
    }
  };

  return (
    <form ref={formRef} className="w-full flex flex-col gap-8 items-stretch">
      <p className="text-lg">{t("contact-form-title")}</p>
      <input
        placeholder={t("contact-input-name")}
        className="rounded-md bg-white p-6 text-gray-800 outline-primary"
        value={contactData.name}
        onChange={onChange("name")}
        required
        maxLength={100}
      />
      <input
        placeholder="Email"
        className="rounded-md bg-white p-6 text-gray-800 outline-primary"
        value={contactData.email}
        onChange={onChange("email")}
        required
        maxLength={100}
        type="email"
      />
      <textarea
        placeholder={t("contact-input-question")}
        className="rounded-md bg-white p-6 text-gray-800 outline-primary"
        value={contactData.query}
        onChange={onChange("query")}
        minLength={0}
        maxLength={1000}
      ></textarea>
      <Button onClick={submit} className="self-start">
        {t("button-send-request")}
      </Button>
    </form>
  );
};
