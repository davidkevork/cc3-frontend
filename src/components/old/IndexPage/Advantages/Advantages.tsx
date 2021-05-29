import React from 'react';
import { hot } from 'react-hot-loader';
import intl from 'react-intl-universal';
import { enUS } from '../../../locales/en-US';
import { INDEXPAGE_USER, INDEXPAGE_BUSINESS } from '../../../constants/images';
import './Advantages.scss';

const role = (process.env.ROLE || '').toUpperCase();

const LIST_ADVANTAGES = () => {
  // enUS.INDEX_PAGE.ADVANTAGES.USER.LIST is an array
  // but intl.get() is only specified to type string and not array/object we will have ts error
  // @ts-ignore
  const list: object[] = role === 'USER' ?
    intl.get('INDEX_PAGE.ADVANTAGES.USER.LIST') || enUS.INDEX_PAGE.ADVANTAGES.USER.LIS
    :
    intl.get('INDEX_PAGE.ADVANTAGES.BUSINESS.LIST') || enUS.INDEX_PAGE.ADVANTAGES.BUSINESS.LIST;
  const template = (obj: any, index: number) => {
    return (
      <div className="info-item" key={index}>
        <div className="icon" dangerouslySetInnerHTML={{ __html: obj.ICON }}/>
        <div className="texts">
          <span className="title">{obj.TITLE}</span>
          <span className="content">{obj.CONTENT}</span>
        </div>
      </div>
    );
  };
  return (
    <div>{list.map((content: any, index: number) => template(content, index))}</div>
  );
};

const getText = (text: string) => {
  const path = `INDEX_PAGE.ADVANTAGES.${role}.${text}`;
  const pathValue = path.split('.').reduce((o, i) => o[i], enUS);
  return intl.get(path).d(pathValue);
};

const USER_IMAGES = () => {
  return (
    <div className="user-images">
      <img className="img1" src={INDEXPAGE_USER.ADVANTAGES.IMAGE1} />
      <img className="img2" src={INDEXPAGE_USER.ADVANTAGES.IMAGE2} />
    </div>
  );
};

const BUSINESS_IMAGES = () => {
  return (
    <div className="business-images">
      <img className="img1" src={INDEXPAGE_BUSINESS.ADVANTAGES.IMAGE1} />
      <img className="img2" src={INDEXPAGE_BUSINESS.ADVANTAGES.IMAGE2} />
    </div>
  );
};

class Advantages extends React.Component {
  public render() {
    return (
      <div className="advantages" id="advantages">
        <h3 className="title">{getText('TITLE')}</h3>
        <div className="list">
          <LIST_ADVANTAGES/>
        </div>
        {role === 'USER' ? <USER_IMAGES/> : <BUSINESS_IMAGES/>}
      </div>
    );
  }
}

export default hot(module)(Advantages);
