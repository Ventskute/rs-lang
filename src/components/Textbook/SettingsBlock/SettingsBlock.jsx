import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../utils/actions';
import './SettingsBlock.scss';
import settingsIcon from '../../../assets/icons/settings.png';
import { Button, Modal } from 'react-bootstrap';

function SettingsBlock() {
  const { settings } = useSelector(state => state);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const onCheckedInput = (e) => {
    dispatch({
      type: actions.SET_SETTINGS,
      payload: {
        [e.target.name]: e.target.checked
      }
    })
  };


  const SettingsModal = (props) => {
    return (
      <Modal
        {...props}
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Настройки
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="textbook__settings">
            <div className="settings translation-settings">
              <input
                className="settings__checkbox"
                name="translations"
                type="checkbox"
                onChange={(e) => onCheckedInput(e)}
                checked={settings.translations}
              />
              <span className="settings__checkbox_description">Отображать перевод слов/предложений</span>
            </div>
            <div className="settings button-settings">
              <input
                className="settings__checkbox"
                name="buttons"
                type="checkbox"
                onChange={(e) => onCheckedInput(e)}
                checked={settings.buttons}
              />
              <span className="settings__checkbox_description">Отображать кнопки-опции слов</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (<>
    <img src={settingsIcon} alt="settings" className='settings--img' onClick={() => setShowModal(true)}/>
    <SettingsModal onHide={() => setShowModal(false)}/>
  </>);
}

export default SettingsBlock;
