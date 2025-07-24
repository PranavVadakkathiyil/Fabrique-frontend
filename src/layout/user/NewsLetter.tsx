
const NewsLetter = () => {
  return (
    <section className=" w-full p-8  sm:flex bg-black text-white items-center justify-evenly">
      <p className="text-3xl">STAY UP TO DATE ABOUT LATEST OFFERS</p>
      
        <form action="" className="flex flex-col gap-5 sm:mt-0 mt-4">
            <input  className="border sm:w-96 sm:p-3 p-2 rounded-full" type="email" name="email" id="email" placeholder="email@gmail.com" required/>
        <button type="submit" className="p-1 rounded-full bg-white text-black">Subscribe to Newsletter</button>
     
        </form>
        
         
      </section>
  )
}

export default NewsLetter