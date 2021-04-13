import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Nav } from "react-bootstrap";

import home from "../../assets/icons/home.png";
import book from "../../assets/icons/open-book.png";
import savannah from "../../assets/icons/savannah.png";
import audioChallenge from "../../assets/icons/audioChallenge.png";
import sprint from "../../assets/icons/sprint.png";
import fillwords from "../../assets/icons/fillword.png";
import statistics from "../../assets/icons/statistics.png";
import team from "../../assets/icons/teamwork.png";

import "./Menu.scss";

const items = [
  {
    to: "/",
    name: "Главная страница",
    img: home
  },
  {
    to: "/Textbook",
    name: "Электронный учебник",
    img: book
  },
  {
    to: "/Savanna",
    name: "Игра \"Саванна\"",
    img: savannah
  },
  {
    to: "/audioChallenge",
    name: "Игра \"Аудиовызов\"",
    img: audioChallenge
  },
  {
    to: "/sprint",
    name: "Игра \"Спринт\"",
    img: sprint
  },
  {
    to: "/fillwords",
    name: "Игра \"Филворды\"",
    img: fillwords
  },
  {
    to: "/statistics",
    name: "Статистика",
    img: statistics
  },
  {
    to: "/team",
    name: "О Команже",
    img: team
  },
]

export default function Menu() {
  const [isHidden, setHide] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const current = document.querySelector('.link--active');
    current && current.classList.remove('link--active');

    const a = document.querySelector(`.nav-link[href='${location.pathname}']`);
    
    if (a) {
      a.classList.add("link--active");
    }
  }, [location.pathname]);

  return (<>
    <div className="burger" onClick={() => setHide(!isHidden)}>&#8801;</div>
    <div className={`menu-wrapper ${isHidden ? "hidden" : ""}`}>
      <Nav>
        { items.map((item, i) => (
          <Link key={i} className="nav-link" to={item.to}>
            <img className="icon" src={item.img} alt={item.name} title={item.name} />
          </Link>
        ))}
      </Nav>
    </div>
  </>);
}
