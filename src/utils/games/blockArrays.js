import savanna from '../../assets/images/games/savanna.png';
import audio from '../../assets/images/games/audio.png';
import sprint_p from '../../assets/images/games/sprint_preview.png';
import fillwords from '../../assets/images/games/words.png';

export const gamesArr = [
    {
      name: 'Саванна',
      className: '__savanna',
      link: './savanna',
      img: savanna,
      description: 'Здесь будет описание геймплея игры.'
    },
    {
      name: 'Спринт',
      className: '__sprint',
      link: './sprint',
      img: sprint_p,
      description: 'Игра, в которой необходимо указать, верен ли перевод слов за отведенное время.'
    },
    {
      name: 'Филворды',
      className: '__fillwords',
      link: './fillwords',
      img: fillwords,
      description: 'Здесь будет описание геймплея игры.'
    },
    {
      name: 'Аудиовызов',
      className: '__audio-call',
      link: './audioChallenge',
      img: audio,
      description: 'Здесь будет описание геймплея игры.'
    },
  ];