import RazoImg from '../../assets/razorpay_img.png'
const Footer = () => {
  return (
    <footer>
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
)}


export default Footer