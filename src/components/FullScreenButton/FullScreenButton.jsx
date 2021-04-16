import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import fullScreenImg from '../../assets/icons/fullScreen.png';
import exitFullScreenImg from '../../assets/icons/exit_fullScreen.png';

import './FullScreenButton.scss';

export default function FullScreenButton() {
  const [img, setImg] = useState(fullScreenImg)

  function handleClick() {
    if (!document.fullscreen) {
      document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 122}))
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreen) {
        setImg(exitFullScreenImg)
      } else {
        setImg(fullScreenImg)
      }
    })
  }, [])

  return (
    <Button className='fullscreen-button' onClick={handleClick}>
      <img src={img} alt="full screen"/>
    </Button>
  )
}