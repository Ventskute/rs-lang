import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getShortTermStats, getLongTermStats } from "../../utils/api/api";

import "./Animal.scss";
import Speech from "../../assets/images/speech.png";
import Giraffe1 from "../../assets/images/animal/animal1.png";
import Giraffe2 from "../../assets/images/animal/animal2.png";
import Giraffe3 from "../../assets/images/animal/animal3.png";
import Giraffe4 from "../../assets/images/animal/animal4.png";
import Giraffe5 from "../../assets/images/animal/animal5.png";
import Giraffe6 from "../../assets/images/animal/animal6.png";

const phrases = {
  one: "Помоги мне подрасти!",
  two: "Спасибо! Я подрос!",
};

export default function Animal() {
  const { user } = useSelector((state) => state);
  const [sizeGiraffe, setSizeGiraffe] = useState(phrases.one);
  const [growthStageGiraffe, setGrowthStageGiraffe] = useState(Giraffe1);
  const [widthGiraffe, setWidthGiraffe] = useState(44);
  const [heightGiraffe, setHeightGiraffe] = useState(80);

  useEffect(() => {
    getLongTermStats(user.userId).then((data) => {
      console.log(data.length);
      if (data.length > 30) {
        setGrowthStageGiraffe(Giraffe2);
      }
      if (data.length >= 31 && data.length <= 240) {
        setGrowthStageGiraffe(Giraffe3);
      }
      if (data.length >= 240 && data.length <= 1500) {
        setGrowthStageGiraffe(Giraffe4);
      }
      if (data.length >= 1501 && data.length <= 2500) {
        setGrowthStageGiraffe(Giraffe5);
      }
      if (data.length >= 25001 && data.length <= 3600) {
        setGrowthStageGiraffe(Giraffe6);
      }
    });
    getShortTermStats(user.userId).then((data) => {
      let size =
        data.optional.audioChallenge.learnedWords +
        data.optional.fillWords.learnedWords +
        data.optional.savanna.learnedWords +
        data.optional.sprint.learnedWords;

      setWidthGiraffe(widthGiraffe + size);
      setHeightGiraffe(heightGiraffe + size);

      if (size > 0) {
        setSizeGiraffe(phrases.two);
      }
    });
  }, []);
  return (
    <div className="animal">
      <div className="animal_speech">
        <img src={Speech} />
        <p className="animal_txt"> {sizeGiraffe}</p>{" "}
      </div>
      <div className="animal_img">
        <img
          src={growthStageGiraffe}
          alt="Giraffe"
          style={{ width: widthGiraffe, height: heightGiraffe }}
        />
      </div>
    </div>
  );
}
