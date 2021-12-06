import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetQuoteDataAPI } from "../apis/Quote";
import "../css/Homepage.css";
import doc1 from "../assets/doc1.jpg";
import doc2 from "../assets/doc2.jpg";
import doc3 from "../assets/doc3.jpg";
import doc4 from "../assets/doc4.jpg";
import care1 from "../assets/care1.jpg";
import care2 from "../assets/care2.jpg";
import care3 from "../assets/care3.jpg";
import care4 from "../assets/care4.jpg";
import date1 from "../assets/date1.jpg";
import date2 from "../assets/date2.jpg";
import date3 from "../assets/date3.jpg";
import date4 from "../assets/date4.jpg";
import date5 from "../assets/date5.jpg";
import ngo1 from "../assets/ngo1.jpg";
import ngo2 from "../assets/ngo2.jpg";
import ngo3 from "../assets/ngo3.jpg";
import doctor from "../assets/doctorpic1.jpg";
import care from "../assets/carepic1.jpg";
import date from "../assets/datepic1.jpg";
import ngo from "../assets/ngopic1.jpg";

const veterinaryDoctorImages = [doc1, doc2, doc3, doc4];
const caretakerImages = [care1, care2, care3, care4];
const dateAndMateImages = [date1, date2, date3, date4, date5];
const ngoImages = [ngo1, ngo2, ngo3];

const doctorSlider = () => {
  return veterinaryDoctorImages.map((image, index) => {
    return (
      <li key={index}>
        <img src={image} alt={`Doctor ${index}`} uk-cover={""} />
      </li>
    );
  });
};

const caretakerSlider = () => {
  return caretakerImages.map((image, index) => {
    return (
      <li key={index}>
        <img src={image} alt={`Caretaker ${index}`} uk-cover={""} />
      </li>
    );
  });
};

const dateAndMateSlider = () => {
  return dateAndMateImages.map((image, index) => {
    return (
      <li key={index}>
        <img src={image} alt={`Date & Mate ${index}`} uk-cover={""} />
      </li>
    );
  });
};

const ngoSlider = () => {
  return ngoImages.map((image, index) => {
    return (
      <li key={index}>
        <img src={image} alt={`NGO ${index}`} uk-cover={""} />
      </li>
    );
  });
};

const HomePage = () => {
  const [doctorQuotes, setDoctorQuotes] = useState([]);
  const [ngoQuotes, setNgoQuotes] = useState([]);

  useEffect(() => {
    document.title = "Welcome to Philozooic";
    GetQuoteDataAPI("Doctor")
      .then(({ data: foundDoctorQuotes }) => {
        setDoctorQuotes(foundDoctorQuotes);
      })
      .catch((error) => {
        console.error(error);
      });
    GetQuoteDataAPI("NGO")
      .then(({ data: foundNGOQuotes }) => {
        setNgoQuotes(foundNGOQuotes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  return (
    <>
	<section class="one">
    <h1 className="hometitle">PET CARE</h1>
    <h1 className="hometitle2">MADE SIMPLE.</h1>
    <h2 className="animatecall">Your pet's one stop shop for :</h2>
<b>
  <span id="animspan">
    Veternary Doctor<br /> 
    Caretakers<br />
    Date and Mate<br />
    NGO<br />
    </span>
</b>

<p id="graphic">
.  .  .  .  .  .  .  .  .  .  .  .  . <br />
.  .  .  .  .  .  .  .  .  .  .  .  . <br />
.  .  .  .  .  .  .  .  .  .  .  .  . <br />
.  .  .  .  .  .  .  .  .  .  .  .  . <br />
.  .  .  .  .  .  .  .  .  .  .  .  . <br />
.  .  .  .  .  .  .  .  .  .  .  .  . <br />
.  .  .  .  .  .  .  .  .  .  .  .  . <br />
.  .  .  .  .  .  .  .  .  .  .  .  . <br />
.  .  .  .  .  .  .  .  .  .  .  .  . <br />
 
</p>


  <div class='box'>
  <div class='wave -one'></div>
  <div class='wave -two'></div>
  <div class='wave -three'></div>
</div>
	</section>

	
	<section class="two">
  <h2 id="title">OUR SERVICES</h2>
  <svg id="divider" width="370" height="2" viewBox="0 0 370 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="-0.000671387" y1="1" x2="370.001" y2="1" stroke="white" stroke-opacity="0.7"/>
</svg>

  
<div class="content">
    
    <div class="card card-red">
    <img src={doctor} id="cardpic" />
      <h3>Veterinary Doctors</h3>
      <p>We have some of the best veterinary doctors available in
              your location. We want your pet to be
              healthy and free of any problems.</p>
      <div class="pad-top">           <Link to={"/doctor"} target={"_blank"}>
                                        <a class="button">Learn More</a>
                                      </Link>
        </div>
    </div>
    
    <div class="card card-red">
    <img src={care} id="cardpic" />
      <h3>Caretakers</h3>
      <p>You can trust our wide range of verified caretakers who'll provide your pets with a lot of love and attention.</p>
      <div class="pad-top"><Link to={"/caretaker"} target={"_blank"}><a class="button">Learn More</a></Link></div>
    </div>
    
    <div class="card card-red">
    <img src={date} id="cardpic" />
      <h3>Dating & Mating</h3>
      <p>Find dates and other friends for your pet on our website.  </p>
      <div class="pad-top"><Link to={"/date-mate"} target={"_blank"}><a class="button">Learn More</a></Link></div>
    </div>
    
    <div class="card card-red">
    <img src={ngo} id="cardpic" />
      <h3>NGO</h3>
      <p>We have listed several NGO which can take care of your pets. </p>
      <div class="pad-top"><Link to={"/ngo"} target={"_blank"}><a class="button">Learn More</a></Link></div>
    </div>
    
    
  </div>

	</section>

    </>
  );
};

export default HomePage;
