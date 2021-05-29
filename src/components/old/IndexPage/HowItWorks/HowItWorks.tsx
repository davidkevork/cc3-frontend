import React from 'react';
import { hot } from 'react-hot-loader';
import intl from 'react-intl-universal';
import { enUS } from '../../../locales/en-US';
import { INDEXPAGE_USER, INDEXPAGE_BUSINESS } from '../../../constants/images';
import './HowItWorks.scss';

const role = (process.env.ROLE || '').toUpperCase();

const LIST_HOW_WORK = () => {
  // enUS.INDEX_PAGE.HOW_IT_WORKS.USER.LIST is an array
  // but intl.get() is only specified to type string and not array/object we will have ts error
  // @ts-ignore
  const list: object[] = role === 'USER' ?
    intl.get('INDEX_PAGE.HOW_IT_WORKS.USER.LIST') || enUS.INDEX_PAGE.HOW_IT_WORKS.USER.LIST
    :
    intl.get('INDEX_PAGE.HOW_IT_WORKS.BUSINESS.LIST') || enUS.INDEX_PAGE.HOW_IT_WORKS.BUSINESS.LIST;
  const template = (content: string, index: number) => {
    return (
      <div className="info-item" key={index}>
        <span className="label">{index + 1}</span>
        <span className="content">{content}</span>
      </div>
    );
  };
  return (
    <div>{list.map((content: any, index: number) => template(content, index))}</div>
  );
};

const getText = (text: string) => {
  const path = `INDEX_PAGE.HOW_IT_WORKS.${role}.${text}`;
  const pathValue = path.split('.').reduce((o, i) => o[i], enUS);
  return intl.get(path).d(pathValue);
};

const USER_IMAGES = () => {
  return (
    <div className="user-images">
      <img className="img1" src={INDEXPAGE_USER.HOWITWORKS.IMAGE1} />
      <img className="img2" src={INDEXPAGE_USER.HOWITWORKS.IMAGE2} />
      <img className="img3" src={INDEXPAGE_USER.HOWITWORKS.IMAGE3} />
      <img className="img4" src={INDEXPAGE_USER.HOWITWORKS.IMAGE4} />
      <img className="img5" src={INDEXPAGE_USER.HOWITWORKS.IMAGE5} />
      <img className="img6" src={INDEXPAGE_USER.HOWITWORKS.IMAGE6} />
      <img className="img7" src={INDEXPAGE_USER.HOWITWORKS.IMAGE7} />
    </div>
  );
};

const BUSINESS_IMAGES = () => {
  return (
    <div className="business-images">
      <img className="img1" src={INDEXPAGE_BUSINESS.HOWITWORKS.IMAGE1} />
      <img className="img2" src={INDEXPAGE_BUSINESS.HOWITWORKS.IMAGE2} />
      <img className="img3" src={INDEXPAGE_BUSINESS.HOWITWORKS.IMAGE3} />
    </div>
  );
};

class HowItWorks extends React.Component {
  public render() {
    return (
      <div className="howItWorks" id="howItWorks">
        <div className="text">
          <h3 className="title">{getText('TITLE')}</h3>
          <p className="subtitle">{getText('SUBTITLE')}</p>
          <div className="list">
            <LIST_HOW_WORK/>
          </div>
        </div>
        {role === 'USER' ? <USER_IMAGES/> : <BUSINESS_IMAGES/>}
      </div>
    );
  }
}

export default hot(module)(HowItWorks);
