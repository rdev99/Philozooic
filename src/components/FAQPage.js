import React, { useEffect } from "react";
import "../css/General.css";

const FAQPage = () => {
  useEffect(() => {
    document.title = "FAQs | Philozooic";
  });

  return (
    <>
      <div className={"section"}>
        <h1 className={"heading-text about"}>Frequently Asked Questions</h1>
        <ul uk-accordion={"multiple: true"}>
          <li className={"uk-open faq-item"}>
            <div className={"uk-accordion-title question"}>
              Are the animals available for mating safe for my pet?
            </div>
            <div className={"uk-accordion-content"}>
              <p className={"answer"}>
                Yes, they are absolutely safe and trustworthy as everything
                regarding the pets like their medical history and everything
                else necessary will be provided.
              </p>
            </div>
          </li>

          <li className={"faq-item"}>
            <div className={"uk-accordion-title question"}>
              How do I know if the doctor is good enough for my pet?
            </div>
            <div className={"uk-accordion-content"}>
              <p className={"answer"}>
                Every detail regarding the doctor will be provided in their
                profile section like rating, fees, medical qualification,
                experience etc.
              </p>
            </div>
          </li>
          <li className={"faq-item"}>
            <div className={"uk-accordion-title question"}>
              What do I do if I need a sudden assistance for my pet?
            </div>
            <div className={"uk-accordion-content"}>
              <p className={"answer"}>
                There will be a chat option which will forward your message to
                all the available doctors available in our platform which will
                enable instant replies.
              </p>
            </div>
          </li>
          <li className={"faq-item"}>
            <div className={"uk-accordion-title question"}>
              How do I know if the caretaker for my pet will be gentle to it and
              not harsh?
            </div>
            <div className={"uk-accordion-content"}>
              <p className={"answer"}>
                All the caretakers will be legally verified and eligible to be a
                caretaker on our platform. Their experience, rating, charges and
                everything else will be provided.
              </p>
            </div>
          </li>
          <li className={"faq-item"}>
            <div className={"uk-accordion-title question"}>
              Is your platform verified from the required authorities?
            </div>
            <div className={"uk-accordion-content"}>
              <p className={"answer"}>
                Yes, it’s completely verified from the corresponding regulatory
                authorities.
              </p>
            </div>
          </li>
          <li className={"faq-item"}>
            <div className={"uk-accordion-title question"}>
              Are the NGOs safe enough to contact them?
            </div>
            <div className={"uk-accordion-content"}>
              <p className={"answer"}>
                Yes, all the NGOs registered on Philozooic are completely
                authorized from the regulatory bodies and you can rely on them
                day and night.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FAQPage;
