import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { url } from '../../utils/api';

import gamesPic from '../../assets/images/games.jpg';
import bookPic from '../../assets/images/book.png';
import animalPic from '../../assets/images/animal.png';
import pronounPic from '../../assets/images/pronoun.png';
import settingsPic from '../../assets/images/settings_preview.png';
import statsPic from '../../assets/images/stats.jpg';
import './Main.scss';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Main() {
  const featuresContent = [
    {
    img: gamesPic,
      title: 'Игры',
      description: 'Совмещай приятное с полезным — изучай английский играя в крутые мини-игры! ',
    },
    {
      img: statsPic,
      title: 'Статистика',
      description: 'Сохраняй статистику своего изучения, чтобы наглядно видеть прогресс!',
    },
    {
      img: pronounPic,
      title: 'Произношение',
      description: 'Тренируй произношение слов, чтобы говорить красиво!',
    },
    {
      img: settingsPic,
      title: 'Настройки',
      description: 'Подстрой приложение под себя!',
    },
    {
      img: bookPic,
      title: 'Словарь',
      description: 'Добавляйте слова в словарь, помечайте как сложные или удаляйте их!',
    },
    {
      img: animalPic,
      title: 'Личный питомец',
      description: 'Твой питомец будет расти по ходу твоего прогресса в изучении языка!',
    },
  ];


  return (
    <div className="main">
      <Header />
      <main className="main-content container">
        <h1 className="main-content__title">
          Изучай английский язык <span className="highlight">ЛЕГКО</span> и{' '}
          <span className="highlight">КОМФОРТНО</span> вместе с{' '}
          <span className="highlight">RS Lang</span>
        </h1>
        <div className="main-content__video">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/t8k71QcArnk"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
        <div className="main-content__description-block">
          <p className="paragraph">
            Игровое приложение, которое позволит вам удобно и с интересом изучать английский язык.
            Здесь используется сборник из{' '}
            <span className="highlight">3600 самых популярных английских слов</span>, все слова
            разбиты на разделы, в зависимости от сложности.
          </p>
          <p className="paragraph">
            <span className="highlight">Электронный учебник</span> позволит вам выбирать, помечать,
            добавлять слова в собственный <span className="highlight">словарь</span>, для
            дальнейшего изучения и закрепления пройденного.
          </p>
          <p className="paragraph">
            <span className="highlight">Окно статистики</span> отражает ваш прогресс за последний
            день и за все время пользования данным приложением, вы можете отслеживать пройденный
            путь вплоть до нюансов.
          </p>
          <p className="paragraph">
            Для закрепления изученных слов и изучения новых, присутствует{' '}
            <span className="highlight">4 различных мини-игры</span>, в которых вам предстоит
            проверить себя в написании, аудировании и произношении английских слов. Это поможет
            сделать обучение английскому языку весёлым и захватывающим.
          </p>
        </div>
        <div className="main-content__features features">
          <h2 className="features__title">Особенности приложения</h2>
          <div className="features__content">
            {featuresContent.map((el, i) => (
              <Card key={i} className="feature-block">
                <Card.Img variant="top" src={el.img} />
                <Card.Body>
                  <Card.Title>{el.title}</Card.Title>
                  <Card.Text className="text-muted"> {el.description}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
