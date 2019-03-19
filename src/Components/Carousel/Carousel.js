import React from 'react'

const Carousel = () => {
  return (
    <div className='mainCarousel'>
      <div className="slider">
            <div className='shadow'/>
               <figure>
                    <div id="one" className="slide">
                        
                        <img className='img' src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="slide-one"/>
                    </div>

                    <div id="two" className="slide">
                       
                        <img className='img' src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="slide-two"/>
                    </div>
                    
                    <div id="three" className="slide">
                        <img className='img' src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1635&q=80" alt="slide-three"/>
                    </div>

                    <div id="four" className="slide">
                        <img className='img' src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="slide-three"/>
                    </div>

                    <div id="four" className="slide">
                        <img className='img' src="https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1585&q=80" alt="slide-three"/>
                    </div>
               </figure>
            </div>
    </div>
  )
}

export default Carousel;
