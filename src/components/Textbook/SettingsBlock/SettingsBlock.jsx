import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../utils/actions';
import './SettingsBlock.scss';
import settingsIcon from '../../../assets/icons/settings.png';
import { Button, Form, Modal } from 'react-bootstrap';

const SettingsModal = (props) => {
  const { settings } = useSelector(state => state);
  const dispatch = useDispatch();

  const onCheckedInput = (e) => {
    dispatch({
      type: actions.SET_SETTINGS,
      payload: {
        [e.target.name]: e.target.checked
      }
    })
  };

  return (
    <Modal
      {...props}
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
          <Form>
            <Form.Check
              type='checkbox'
              name="translations"
              checked={settings.translations}
              onChange={onCheckedInput}
              label={`Отображать перевод слов/предложений`}
              />
            <Form.Check
              type='checkbox'
              name="buttons"
              checked={settings.buttons}
              onChange={onCheckedInput}
              label={`Отображать кнопки-опции слов`}
            />
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}

function SettingsBlock() {
  const [showModal, setShowModal] = useState(false);

  return (<>
    <img src={settingsIcon} alt="settings" className='settings--img' onClick={() => setShowModal(true)}/>
    <SettingsModal show={showModal} onHide={() => setShowModal(false)}/>
  </>);
}

export default SettingsBlock;
