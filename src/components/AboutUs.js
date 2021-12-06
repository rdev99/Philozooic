import React, { useEffect } from "react";
import "../css/General.css";

const AboutUs = () => {
  useEffect(() => {
    document.title = "About Us | Philozooic";
  });

  return (
    <div className={"section"}>
      <h1 className={"heading-text about"}>About Us</h1>
      <h3>What does Philozooic mean?</h3>
      <p>
        <i>PHILOZOOIC</i> word comes from the word <i>Philozoic</i>, where Philo
        means Love and Zoic means animal. PHILOZOOIC is love for animals.
      </p>
      <h3>Who are we?</h3>
      <p>
        We are PHILOZOOIC - a ONE STOP solution for your pets. A dedicated
        platform for pets and animals, available 24 &times; 7 &times; 365.
      </p>
      <h3>What do we do?</h3>
      <p>
        PHILOZOOIC is a platform where you can get each and every solution for
        your pets.
      </p>
      <p>
        Here at PHILOZOOIC we provide you with doctors whom you can consult,
        book appointments for your pets nearby your residence.
      </p>
      <p>
        Want to go on a vacation but can’t take your pets with you?
        <br />
        Don’t Worry! We provide you with caretakers who can look after your pets
        when you are not with them.
      </p>
      <p>
        Here at PHILOZOOIC we have uplifted the reach of NGOs who are trying to
        look after the animals left abandoned in this massive world. Reporting
        to those NGOs have become easy with the help of PHILOZOOIC which helps
        them to work at their full capacity.
      </p>
      <p>
        On the same platform we provide a Dating/Mating service for pets, where
        the people can register themselves and check if there’s any pet
        available for dating /mating. We will provide a healthy platform as
        medical history and other information about the pet will be shared and
        customers and users can verify or check before opting for service.
      </p>
      <p>
        On the same platform we provide a Dating/Mating service for pets, where
        the people can register themselves and check if there’s any pet
        available for dating /mating. We will provide a healthy platform as
        medical history and other information about the pet will be shared and
        customers and users can verify or check before opting for service.
      </p>
    </div>
  );
};

export default AboutUs;
