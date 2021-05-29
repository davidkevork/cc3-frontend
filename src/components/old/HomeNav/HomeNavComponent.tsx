import React from 'react';
import Raven from 'raven-js';
import intl from 'react-intl-universal';
import { hot } from 'react-hot-loader';
import { NavLink } from 'react-router-dom';
import { enUS } from '../../locales/en-US';
import { SmartCashWebLogo } from '../../constants/images';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Icon from '@material-ui/core/Icon';
import MenuIcon from '@material-ui/icons/Menu';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Payment from '@material-ui/icons/Payment';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import GetApp from '@material-ui/icons/GetApp';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as exchange from '../../helpers/exchange';
import { IUserBusinessReducerState } from '../../reducers/reducer_user_business';
import { isEmpty } from '../../helpers/isEmpty';
import { redirect } from '../../helpers/history';
import { round } from '../../helpers/formatNumbers';
import './HomeNav.scss';

interface IHomeNavProps {
  loadBusinessProfile: (props: IUserBusinessReducerState) => void;
  updateRates: (exchangeName: string) => void;
  getDefaultCurrency: () => string;
  logout: () => void;
  userBusiness: IUserBusinessReducerState;
}

interface IHomeNavState {
  readonly isOpen: boolean;
  readonly currency: any;
  readonly multiplier: any;
  readonly balance: any;
  readonly anchorEl: null | any;
}

class HomeNavComponent extends React.Component<IHomeNavProps, IHomeNavState> {
  private interval!: NodeJS.Timer;
  constructor(props: any) {
    super(props);
    const currency = this.props.getDefaultCurrency();
    this.state = {
      isOpen: false,
      currency,
      multiplier: 1,
      balance: 0,
      anchorEl: null,
    };
    if (exchange.shouldUpdateRates() || isEmpty(exchange.getRates().currencies)) {
      this.props.updateRates(this.props.userBusiness.exchange.schema);
    }
  }
  public componentWillReceiveProps(nexProps: Readonly<IHomeNavProps>) {
    if (process.env.ROLE === 'business') {
      this.defineBusinessState(nexProps.userBusiness);
    }
  }
  public componentDidMount() {
    Raven.setTagsContext({
      userId: this.props.userBusiness.userId,
      businessId: this.props.userBusiness.businessId,
    });
    this.interval = setInterval(() => {
      if (process.env.ROLE === 'business') {
        this.props.loadBusinessProfile(this.props.userBusiness);
      }
      // tslint:disable-next-line:align
    }, 60000);
    if (process.env.ROLE === 'business') {
      this.defineBusinessState(this.props.userBusiness);
    }
  }
  public componentWillUnmount() {
    clearInterval(this.interval);
  }
  private toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  private defineBusinessState(userBusiness: IUserBusinessReducerState) {
    const { wallet, walletBalance, addressesBalance } = userBusiness;
    this.setState({
      multiplier: exchange.getCurrencyRate(this.state.currency),
      balance: wallet ? Number(walletBalance).toFixed(2) : Number(addressesBalance).toFixed(2),
    });
  }
  private handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  }
  private handleClose = () => {
    this.setState({ anchorEl: null });
  }
  public userLinks() {
    const CARDS = intl.get('HOMENAV.CARDS').d(enUS.HOMENAV.CARDS);
    const PROFILE = intl.get('HOMENAV.PROFILE').d(enUS.HOMENAV.PROFILE);
    const SETTINGS = intl.get('HOMENAV.SETTINGS').d(enUS.HOMENAV.SETTINGS);
    const LOGOUT = intl.get('HOMENAV.LOGOUT').d(enUS.HOMENAV.LOGOUT);
    const open = Boolean(this.state.anchorEl);
    const redirectCards = () => redirect('/cards');
    const redirectProfile = () => redirect('/profile');
    const redirectSettings = () => redirect('/settings');
    return (
      <React.Fragment>
        <MenuList className="menu">
          <MenuItem disableRipple={true} disableTouchRipple={true} onClick={redirectCards}>
            {CARDS}
          </MenuItem>
          <MenuItem
            className="account-menu-item"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={redirectProfile}
          >
            {PROFILE}
          </MenuItem>
          <MenuItem
            className="account-menu-item"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={redirectSettings}
          >
            {SETTINGS}
          </MenuItem>
          <MenuItem
            className="account-menu-item logout"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={this.props.logout}
          >
            {LOGOUT}
          </MenuItem>
          <MenuItem className="account-menu-icon" disableRipple={true} disableTouchRipple={true}>
            <Icon
              aria-owns={open ? 'account-menu' : undefined}
              onClick={this.handleMenu}
            >
              <i className="icon-settings account-settings-gear" aria-hidden="true" />
            </Icon>
          </MenuItem>
        </MenuList>
        <Menu
          id="account-menu"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
          className="account-menu"
        >
          <MenuItem disableRipple={true} disableTouchRipple={true} onClick={redirectProfile}>
            <ListItemIcon>
              <AssignmentInd/>
            </ListItemIcon>
            <ListItemText
              inset={true}
              primary={PROFILE}
            />
          </MenuItem>
          <MenuItem disableRipple={true} disableTouchRipple={true} onClick={redirectSettings}>
            <ListItemIcon className="settings-icon">
              <i className="icon-account-balance-wallet" aria-hidden="true" />
            </ListItemIcon>
            <ListItemText
              inset={true}
              primary={SETTINGS}
            />
          </MenuItem>
          <MenuItem
            className="logout"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={this.props.logout}
          >
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText
              inset={true}
              primary={LOGOUT}
            />
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
  public businessLinks() {
    const LOCATIONS = intl.get('HOMENAV.LOCATIONS').d(enUS.HOMENAV.LOCATIONS);
    const TRANSACTIONS = intl.get('HOMENAV.TRANSACTIONS').d(enUS.HOMENAV.TRANSACTIONS);
    const PROFILE = intl.get('HOMENAV.PROFILE').d(enUS.HOMENAV.PROFILE);
    const RESERVE = intl.get('HOMENAV.RESERVE').d(enUS.HOMENAV.RESERVE);
    const SETTINGS = intl.get('HOMENAV.SETTINGS').d(enUS.HOMENAV.SETTINGS);
    const LOGOUT = intl.get('HOMENAV.LOGOUT').d(enUS.HOMENAV.LOGOUT);
    const DOWNLOAD_APP = intl.get('HOMENAV.SMARTPAY').d(enUS.HOMENAV.SMARTPAY);
    const smartPayLink = 'https://play.google.com/store/apps/details?id=cc.smartcash.pos';
    const open = Boolean(this.state.anchorEl);
    const redirectLocations = () => redirect('/locations');
    const redirectTransactions = () => redirect('/transactions');
    const redirectProfile = () => redirect('/profile');
    const redirectSettings = () => redirect('/settings');
    const redirectResere = () => redirect('/reserve');
    const redirectDownloadApp = () => window.location.href = smartPayLink;
    return (
      <React.Fragment>
        <MenuList className="menu">
          <div className="balance link" onClick={redirectLocations}>
            <span className="balance-left">Σ {this.state.balance}</span>
            {/* tslint:disable-next-line:max-line-length */}
            <span className="balance-right">{this.state.currency} {round(this.state.balance * this.state.multiplier, 2)}</span>
          </div>
          <div className="balance link" onClick={redirectResere}>
            <span className="balance-left">{RESERVE}</span>
            {/* tslint:disable-next-line:max-line-length */}
            <span className="balance-right">{this.props.userBusiness.reserve.currency} {round(this.props.userBusiness.reserve.balance * this.state.multiplier, 2)}</span>
          </div>
          <MenuItem disableRipple={true} disableTouchRipple={true} onClick={redirectLocations}>
            {LOCATIONS}
          </MenuItem>
          <MenuItem disableRipple={true} disableTouchRipple={true} onClick={redirectTransactions}>
            {TRANSACTIONS}
          </MenuItem>
          <MenuItem
            className="account-menu-item"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={redirectProfile}
          >
            {PROFILE}
          </MenuItem>
          <MenuItem
            className="account-menu-item"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={redirectResere}
          >
            {RESERVE}
          </MenuItem>
          <MenuItem
            className="account-menu-item"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={redirectSettings}
          >
            {SETTINGS}
          </MenuItem>
          <MenuItem
            className="account-menu-item"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={redirectDownloadApp}
          >
            {DOWNLOAD_APP}
          </MenuItem>
          <MenuItem className="account-menu-item logout" onClick={this.props.logout}>
            {LOGOUT}
          </MenuItem>
          <MenuItem
            className="account-menu-icon"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={this.handleMenu}
          >
            <Icon
              aria-owns={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              color="inherit"
            >
              <i className="icon-settings account-settings-gear" aria-hidden="true" />
            </Icon>
          </MenuItem>
        </MenuList>
        <Menu
          id="account-menu"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
          className="account-menu"
        >
          <MenuItem disableRipple={true} disableTouchRipple={true} onClick={redirectProfile}>
            <ListItemIcon>
              <AssignmentInd/>
            </ListItemIcon>
            <ListItemText
              inset={true}
              primary={PROFILE}
            />
          </MenuItem>
          <MenuItem disableRipple={true} disableTouchRipple={true} onClick={redirectResere}>
            <ListItemIcon>
              <Payment />
            </ListItemIcon>
            <ListItemText
              inset={true}
              primary={RESERVE}
            />
          </MenuItem>
          <MenuItem disableRipple={true} disableTouchRipple={true} onClick={redirectSettings}>
            <ListItemIcon className="settings-icon">
              <i className="icon-account-balance-wallet" aria-hidden="true" />
            </ListItemIcon>
            <ListItemText
              inset={true}
              primary={SETTINGS}
            />
          </MenuItem>
          <MenuItem disableRipple={true} disableTouchRipple={true} onClick={redirectDownloadApp}>
            <ListItemIcon>
              <GetApp />
            </ListItemIcon>
            <ListItemText
              inset={true}
              primary={DOWNLOAD_APP}
            />
          </MenuItem>
          <MenuItem
            className="logout"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={this.props.logout}
          >
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText
              inset={true}
              primary={LOGOUT}
            />
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
  public render() {
    return (
      <AppBar position="fixed" color="inherit">
        <Toolbar className="homenav-wrapper">
          <div>
            <Icon onClick={this.toggleMenu} className="iconButton" aria-label="Menu">
              <MenuIcon />
            </Icon>
            <NavLink to="/" title="SmartCash">
              <img className="brand-image" alt="SmartCash" src={SmartCashWebLogo} />
            </NavLink>
          </div>
          {process.env.ROLE === 'user' ? this.userLinks() : this.businessLinks()}
          <SwipeableDrawer
            className="drawer"
            open={this.state.isOpen}
            onOpen={this.toggleMenu}
            onClose={this.toggleMenu}
          >
            {process.env.ROLE === 'user' ? this.userLinks() : this.businessLinks()}
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    );
  }
}

export default hot(module)(HomeNavComponent);
