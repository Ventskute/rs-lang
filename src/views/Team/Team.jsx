import React from "react";

import "./Team.scss";

import NikitaImg from "../../assets/images/fotoTeam/Nikita.png";
import VikaImg from "../../assets/images/fotoTeam/Vika.png";
import TaniaImg from "../../assets/images/fotoTeam/Tania.png";
import AndrewImg from "../../assets/images/fotoTeam/Andrew.png";
import AlekseiImg from "../../assets/images/fotoTeam/Aleksei.png";
import GitHub from "../../assets/images/GitHub.png";
import Telegram from "../../assets/images/telegram.png";

const team = [
  {
    foto: NikitaImg,
    fullName: "Никита Левкович",
    position: "Mentor",
    work: "Наставничество. Координация и мотивация команды.",
    gitHub: "https://github.com/mikitaliaukovich",
    telegram: "https://t.me/JAUD1LA",
  },
  {
    foto: VikaImg,
    fullName: "Виктория Венцкуте",
    position: "Team Lead",
    work: "Реализовала игру Филворд",
    gitHub: "https://github.com/Ventskute",
    telegram: "https://t.me/ventskute",
  },
  {
    foto: TaniaImg,
    fullName: "Татьяна Слапик",
    position: "Software engineer",
    work: "Реализовала игру Саванна",
    gitHub: "https://github.com/TatsianaSlapik",
    telegram: "https://t.me/tatiana_slapik",
  },
  {
    foto: AndrewImg,
    fullName: "Андрей Мурашко",
    position: "Software engineer",
    work: "Реализовал игру Спринт",
    gitHub: "https://github.com/Andrewmurashko",
    telegram: "https://t.me/AndrewMurashko",
  },
  {
    foto: AlekseiImg,
    fullName: "Алексей Купчинский",
    position: "Software engineer",
    work: "Реализовал игру Аудиовызов",
    gitHub: "https://github.com/AlekseiBY",
    telegram: "https://t.me/AlekseiBY",
  },
];

export default function Team() {
  return (
    <div className="team">
      {team.map((elem, i) => {
        return (
          <div className="team_card">
            <img src={elem.foto} className="team_foto" />
            <div className="team_info">
              <h4 className="team_fullName">{elem.fullName}</h4>
              <h5 className="team_position">{elem.position}</h5>
              <p className="team_work">{elem.work}</p>
              <div className="team_contacts">
                <a href={elem.gitHub} target="_blank">
                  <img src={GitHub} alt="GitHub" className="github_logo" />
                </a>
                <a href={elem.telegram} target="_blank">
                  <img
                    src={Telegram}
                    alt="Telegram"
                    className="telegram_logo"
                  />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
