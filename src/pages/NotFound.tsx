import img404 from '../assets/404img.svg'
const NotFound = () => {
  return (
    <section className='w-screen h-screen'>
        <div >
            <img src={img404} alt="404img" className='w-screen h-screen'/>
        </div>
        
    </section>
  )
}

export default NotFound