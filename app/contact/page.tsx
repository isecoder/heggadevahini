"use client";

import { useLanguage } from "@/components/context/language_content";

const translations = {
  English: {
    title: "Contact Us",
    publishedBy: "Published By",
    forumName: "World Heggade Welfare Forum &",
    foundationName: "Ashwath Hegde Foundation",
    addressTitle: "Address",
    address: `Kulenjirody Gutthu, 
      Balanja Post & Vill, 
      Belthangady Tq, 
      Mangalore District- 574217`,
    founderTitle: "Founder",
    founderName: "Mr. Ashwath Hegde Balanja",
    coFoundersTitle: "Co-Founders",
    coFounders: ["Mr. Manoj Hegde Elnadu Gutthu", "Mrs. Apeksha Ashwath Hegde"],
    contactTitle: "Contact",
    website: "www.heggadevahini.com",
    email: "Heggadewelfareforum@gmail.com",
    phone: "+91 90196 99336",
  },
  Kannada: {
    title: "ಸಂಪರ್ಕಿಸಿ",
    publishedBy: "ಪ್ರಕಟಿಸಿದವರು",
    forumName: "ವಿಶ್ವ ಹೆಗ್ಗಡೆ ಕಲ್ಯಾಣ ವೇದಿಕೆ &",
    foundationName: "ಅಶ್ವತ್ಹ್ ಹೆಗ್ಡೆ ಫೌಂಡೇಶನ್",
    addressTitle: "ವಿಳಾಸ",
    address: `ಕುಳೆಂಜಿರೋಡಿ ಗುತ್ತು, 
      ಬಾಳಂಜೆ ಪೋಸ್ಟ್ & ಹಳ್ಳಿ, 
      ಬೆಳ್ತಂಗಡಿ ತಾಲೂಕು, 
      ಮಂಗಳೂರು ಜಿಲ್ಲೆ - 574217`,
    founderTitle: "ಸ್ಥಾಪಕರು",
    founderName: "ಶ್ರೀ ಅಶ್ವತ್ಹ್ ಹೆಗ್ಡೆ ಬಾಳಂಜೆ",
    coFoundersTitle: "ಸಹ-ಸ್ಥಾಪಕರು",
    coFounders: ["ಶ್ರೀ ಮನೋಜ್ ಹೆಗ್ಡೆ ಎಳ್ನಾಡು ಗುತ್ತು", "ಶ್ರೀಮತಿ ಅಪೇಕ್ಷಾ ಅಶ್ವತ್ಹ್ ಹೆಗ್ಡೆ"],
    contactTitle: "ಸಂಪರ್ಕ",
    website: "www.heggadevahini.com",
    email: "Heggadewelfareforum@gmail.com",
    phone: "+91 90196 99336",
  },
};

const ContactPage = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-24 px-6 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-orange-500">{t.title}</h2>

      <div className="mt-8 bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-800">{t.publishedBy}</h3>
        <p className="text-gray-600 mt-1">
          <span className="font-semibold">{t.forumName}</span> <br />
          <span className="font-semibold">{t.foundationName}</span>
        </p>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">{t.addressTitle}</h3>
          <p className="text-gray-600 whitespace-pre-line">{t.address}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">{t.founderTitle}</h3>
          <p className="text-gray-600">{t.founderName}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">{t.coFoundersTitle}</h3>
          {t.coFounders.map((name, index) => (
            <p key={index} className="text-gray-600">
              {name}
            </p>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">{t.contactTitle}</h3>
          <p className="text-gray-600">
            <a href="https://www.heggadevahini.com" target="_blank" className="text-orange-500 hover:underline">
              {t.website}
            </a>
          </p>
          <p className="text-gray-600">
            <a href={`mailto:${t.email}`} className="text-orange-500 hover:underline">
              {t.email}
            </a>
          </p>
          <p className="text-gray-600">
            <a href={`tel:${t.phone}`} className="text-orange-500 hover:underline">
              {t.phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
