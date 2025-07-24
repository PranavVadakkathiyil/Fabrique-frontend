import { Link } from "react-router-dom";
import { FaTwitter,FaFacebook,FaInstagram ,FaGithub   } from "react-icons/fa";
import RazoImg from '../assets/razorpay_img.png'
import NewsLetter from "./user/NewsLetter";

const Footer = () => {
 const footer = [
  {
    heading: "COMPANY",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Features", path: "/features" },
      { name: "How It Works", path: "/how-it-works" },
      { name: "Careers", path: "/careers" },
    ],
  },
  {
    heading: "HELP",
    links: [
      { name: "Customer Support", path: "/support" },
      { name: "Delivery Details", path: "/shipping" },
      { name: "Terms & Conditions", path: "/terms" },
      { name: "Privacy Policy", path: "/privacy" },
    ],
  },
  {
    heading: "FAQ",
    links: [
      { name: "Manage Account", path: "/account" },
      { name: "My Orders", path: "/orders" },
      { name: "Return & Exchange", path: "/faq/returns" },
      { name: "Payments", path: "/payments" },
    ],
  },
  {
    heading: "RESOURCES",
    links: [
      { name: "Free eBooks", path: "/resources/ebooks" },
      { name: "Fashion Blog", path: "/blog" },
      { name: "Style Guide", path: "/resources/style-guide" },
      { name: "Size Charts", path: "/resources/size-chart" },
    ],
  },
  {
    heading: "FOLLOW US",
    links: [
      {
        name: "Facebook",
        path: "https://facebook.com",
        icon: "fa-facebook-f",
      },
      {
        name: "Instagram",
        path: "https://instagram.com",
        icon: "fa-instagram",
      },
      {
        name: "Twitter",
        path: "https://twitter.com",
        icon: "fa-twitter",
      },
      {
        name: "LinkedIn",
        path: "https://linkedin.com",
        icon: "fa-linkedin-in",
      },
    ],
  },
];
const socialIcons = [
  { icon: <FaTwitter />, path: "https://twitter.com" },
  { icon: <FaFacebook />, path: "https://facebook.com" },
  { icon: <FaInstagram />, path: "https://instagram.com" },
  { icon: <FaGithub />, path: "https://github.com" },
];



  return (
    <footer>
      <NewsLetter/>
       <section className="  p-4 sm:flex justify-evenly items-center">
         <section>
            <div className="flex flex-col items-center justify-center">
              <p className="  footer-logo">FABRIQUE.CO</p>
              <p className="">"Dress Bold. Shop Smart. Choose Fabrique."</p>
              <ul className="flex gap-5 mt-2">
                {
                  socialIcons.map((data,index)=>(
                    <Link key={index} to={data.path}>
                      <li className="footer-icon">{data.icon}</li>
                    </Link>
                  )

                  )
                }
                
              </ul>
            </div>
        </section>
        <section className="sm:flex gap-7  mt-3">
            {footer.map((data,index)=>(
                <div key={index} className=" ">
                    <p className=" px-2 text-[1.2rem]  font-semibold py-1 sm:footer-content  ">{data.heading}</p>
                   
                    
                        <ul className=" p-2 ">{data.links.map((info,index)=>(
                            <li key={index} className="sm:footer-content hover:text-blue-600">

                            <Link  to={info.path}>{info.name}</Link>
                            
                            
                            </li>
                            
                        ))}</ul>
                    
                </div>
            ))}
        </section>
       </section>
        <section className="w-full flex justify-between items-center border-t-1 px-5 text-gray-400 text-[12px]">
            <div>
              <p>FABRIQUE.CO © 2025 All Rights Reserved</p>
            </div>
            <div className="flex items-center">
              <p>Payment Partner</p>
            <img src={RazoImg} alt="imgpay" width={"120px"} />
            </div>
        </section>
    </footer>
  )
}

export default Footer