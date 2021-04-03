import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';

import home from '../../assets/icons/home.png';
import book from '../../assets/icons/open-book.png'
import savannah from '../../assets/icons/savannah.png';
import audioChallenge from '../../assets/icons/audioChallenge.png';
import sprint from '../../assets/icons/sprint.png';
import fillwords from '../../assets/icons/fillword.png';
import statistics from '../../assets/icons/statistics.png';
import team from '../../assets/icons/teamwork.png';

import './Menu.scss';

export default function Menu() {
  useEffect(()=> {
    const a = document.querySelector(`.nav-link[href='${location.pathname}']`);
    if (a) {
      a.classList.add('link--active')
    }
  }, [location.pathname])
  return (
    <div className='menu-wrapper'>
      <Nav>
        <Nav.Link>
          <img className='icon' src={home} alt="home"/>
        </Nav.Link>
        <Nav.Link href='/Textbook'>
          <img className='icon' src={book} alt="textbook"/>
        </Nav.Link>
        <Nav.Link href='/Savanna'>
          <img className='icon' src={savannah} alt="savannah"/>
        </Nav.Link>
        <Nav.Link href='/audioChallenge'>
          <img className='icon' src={audioChallenge} alt="audio challenge"/>
        </Nav.Link>
        <Nav.Link href='/sprint'>
          <img className='icon' src={sprint} alt="sprint"/>
        </Nav.Link>
        <Nav.Link href='/fillwords'>
          <img className='icon' src={fillwords} alt="fillwords"/>
        </Nav.Link>
        <Nav.Link>
          <img className='icon' src={statistics} alt="statistics"/>
        </Nav.Link>
        <Nav.Link>
          <img className='icon' src={team} alt="team"/>
        </Nav.Link>
      </Nav>
    </div>
  )
}