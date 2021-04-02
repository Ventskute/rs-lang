import React from 'react';
import './SettingsBlock.scss';

function SettingsBlock() {
  const onCheckedInput = (e) => {
    console.log(e);
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);
  };

  return (
    <div className="textbook__settings">
      <div className="settings translation-settings">
        <input
          className="settings__checkbox"
          name="translations"
          type="checkbox"
          onChange={(e) => onCheckedInput(e)}
        />
        <span className="settings__checkbox_description">Отображать перевод слов/предложений</span>
      </div>
      <div className="settings button-settings">
        <input
          className="settings__checkbox"
          name="buttons"
          type="checkbox"
          onChange={(e) => onCheckedInput(e)}
        />
        <span className="settings__checkbox_description">Отображать кнопки-опции слов</span>
      </div>
    </div>
  );
}

export default SettingsBlock;
