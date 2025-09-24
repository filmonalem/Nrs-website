"use client";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const { name, email, subject, message } = formData;
      if (!name || !email || !subject || !message) {
        setStatus({ type: "error", message: "Please fill in all fields." });
        setIsSubmitting(false);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus({ type: "error", message: "Please enter a valid email address." });
        setIsSubmitting(false);
        return;
      }
      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
            <Navbar />
    
      <Head>
        <title>Contact Nicolas Robinson School  | Mekelle, Ethiopia</title>
        <meta
          name="description"
          content="Contact Loop Tech in Mekelle, Tigray, Ethiopia via form, phone (+251925439814), email (hello@nicolasrobinsonschool.com), Telegram, WhatsApp, or social media."
        />
        <meta property="og:title" content="Nicolas Robinson School | Mekelle, Ethiopia" />
        <meta
          property="og:description"
          content="Get in touch with LNicolas Robinson School for innovative web solutions in Mekelle, Tigray, Ethiopia."
        />
        <meta property="og:image" content="/images/og-contact.jpg" />
      </Head>

      <section
        id="contact"
        className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 relative"
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-[url('/images/tech-pattern.svg')] bg-repeat opacity-10"
          aria-hidden="true"
        ></div>

        {/* Animated Blobs */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-48 h-48 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto">
          {/* Skip to Content Link */}
          <a
            href="#contact-form"
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2"
          >
            Skip to contact form
          </a>

          {/* Header */}
          <div className="text-center mb-16 mt-6 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Contact <span className="text-indigo-600">Nicolas Robinson School</span>
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Reach out to us in Mekelle, Tigray, Ethiopia. We're here to bring your digital ideas to life!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div
              className="lg:col-span-1 bg-white rounded-xl shadow-lg p-8 border border-indigo-200 animate-fade-in"
              role="region"
              aria-labelledby="contact-info-heading"
            >
              <h3
                id="contact-info-heading"
                className="text-2xl font-bold text-gray-900 mb-6"
              >
                Get in Touch
              </h3>
              <div className="space-y-6 text-gray-600">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-indigo-600 mr-3 mt-1" size={20} />
                  <address className="not-italic">
                    Mekelle, Tigray, Ethiopia
                  </address>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-indigo-600 mr-3" size={20} />
                  <a
                    href="tel:+251925439814"
                    className="hover:text-indigo-600 focus:text-indigo-600 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Phone number: +251925439814"
                  >
                    +251 925 439 814
                  </a>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-indigo-600 mr-3" size={20} />
                  <a
                    href="mailto:hello@nicolasrobinsonschool.com"
                    className="hover:text-indigo-600 focus:text-indigo-600 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Email address: hello@nicolasrobinsonschool.com"
                  >
                    hello@nicolasrobinsonschool.com
                  </a>
                </div>
                <div className="flex space-x-4 pt-4">
                  {[
                    {
                      href: "tel:+251925439814",
                      label: "Phone",
                      icon: <FaPhone size={24} />,
                    },
                    {
                      href: "https://t.me/+251925439814",
                      label: "Telegram",
                      icon: <FaTelegramPlane size={24} />,
                    },
                    {
                      href: "https://wa.me/+251925439814",
                      label: "WhatsApp",
                      icon: <FaWhatsapp size={24} />,
                    },
                    {
                      href: "https://facebook.com/nicolasrobinsonschool",
                      label: "Facebook",
                      icon: <FaFacebookF size={24} />,
                    },
                    {
                      href: "https://twitter.com/nicolasrobinsonschool",
                      label: "Twitter",
                      icon: <FaTwitter size={24} />,
                    },
                    {
                      href: "https://instagram.com/nicolasrobinsonschool",
                      label: "Instagram",
                      icon: <FaInstagram size={24} />,
                    },
                    {
                      href: "https://linkedin.com/company/nicolasrobinsonschool",
                      label: "LinkedIn",
                      icon: <FaLinkedinIn size={24} />,
                    },
                  ].map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-indigo-600 focus:text-indigo-600 transition transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label={`Contact us via ${social.label}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              {/* Optional Map Placeholder */}
              <div className="mt-8 h-64 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=Mekelle,Tigray,Ethiopia&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Loop Tech Location in Mekelle"
                ></iframe>
              </div> 
            </div>

            {/* Contact Form */}
            <div
              className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8 md:p-12 border border-indigo-200 animate-fade-in"
              role="region"
              aria-labelledby="contact-form-heading"
            >
              <h3
                id="contact-form-heading"
                className="text-2xl font-bold text-gray-900 mb-6"
              >
                Send Us a Message
              </h3>
              <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
                      required
                      aria-required="true"
                      aria-describedby="name-error"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
                      required
                      aria-required="true"
                      aria-describedby="email-error"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
                    required
                    aria-required="true"
                    aria-describedby="subject-error"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
                    required
                    aria-required="true"
                    aria-describedby="message-error"
                  ></textarea>
                </div>
                {status && (
                  <div
                    className={`text-center p-4 rounded-lg ${
                      status.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    } animate-fade-in`}
                    role="alert"
                  >
                    {status.message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg transition transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: "Contact Loop Tech",
              description:
                "Contact Loop Tech in Mekelle, Tigray, Ethiopia via form, phone (+251925439814), email (hello@nicolasrobinsonschool.com), Telegram, WhatsApp, or social media.",
              url: "https://www.nicolasrobinsonschool.com/contact",
              publisher: {
                "@type": "Organization",
                name: "Loop Tech",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.nicolasrobinsonschool.com/images/logo.jpg",
                },
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: "+251925439814",
                    contactType: "Customer Service",
                    email: "hello@nicolasrobinsonschool.com",
                    url: "https://www.nicolasrobinsonschool.com/contact",
                  },
                ],
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Mekelle",
                  addressRegion: "Tigray",
                  addressCountry: "Ethiopia",
                },
                sameAs: [
                  "https://facebook.com/nicolasrobinsonschool",
                  "https://twitter.com/nicolasrobinsonschool",
                  "https://instagram.com/nicolasrobinsonschool",
                  "https://linkedin.com/company/nicolasrobinsonschool",
                  "https://t.me/+251925439814",
                  "https://wa.me/+251925439814",
                ],
              },
            }),
          }}
        />
      </section>
      <Footer/>
    </>
  );
}