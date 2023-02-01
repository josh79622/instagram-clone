import { TrashIcon } from '@heroicons/react/24/outline';
import React, { useRef } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Example = ({ items, imageClassName, onDelete }) => {
    const slideRef = useRef(null);
    function deleteItem (index) {
      if (items.length > 1) {
        if (index + 1 === items.length) {
          slideRef.current.goBack()
        }
      }
      onDelete(index)
    }
    return (
        <div className="relative image_slide">
          {
            items && items.length &&
            <Slide 
              ref={slideRef}
              autoplay={false} 
              indicators={items && items.length > 1 ? true : false}
              duration={500} 
              transitionDuration={200} 
              infinite={false}
            >
              {
                items.map((item, index) => (
                  <div key={`${index} ${item.src}`} className="relative">
                    {
                      onDelete && typeof onDelete === 'function' && (
                        <TrashIcon
                          onClick={() => deleteItem(index)}
                          className="absolute h-6 text-red-400 top-2 right-2 font-extrabold rounded-full cursor-pointer hover:scale-110 hover:brightness-110"
                        />
                      )
                    }
                    <img src={item.src} alt={item.alt} className={imageClassName}/>
                  </div>
                ))
              }
            </Slide>
          }
        </div>
        
    );
};

export default Example