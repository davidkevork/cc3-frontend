import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Icon from '@material-ui/core/Icon';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { redirect } from '../../helpers/history';
import './HomeNav.css';

interface IHomeNavState {
  readonly isOpen: boolean;
  readonly anchorEl: null | any;
}

class HomeNav extends React.Component<{}, IHomeNavState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false,
      anchorEl: null,
    };
  }
  private toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  private handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  private handleClose = () => {
    this.setState({ anchorEl: null });
  };
  public menuLinks = () => {
    const open = Boolean(this.state.anchorEl);
    const redirectLogout = () => redirect('/logout');
    const redirectHome = () => redirect('/home');
    return (
      <React.Fragment>
        <MenuList className="menu">
          <MenuItem
            className="account-menu-item"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={redirectHome}
          >
            Home
          </MenuItem>
          <MenuItem
            className="account-menu-item logout"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={redirectLogout}
          >
            Logout
          </MenuItem>
          <MenuItem
            className="account-menu-icon"
            disableRipple={true}
            disableTouchRipple={true}
          >
            <Icon
              aria-owns={open ? 'account-menu' : undefined}
              onClick={this.handleMenu}
            >
              <i
                className="icon-settings account-settings-gear"
                aria-hidden="true"
              />
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
          <MenuItem
            className="account-menu-item"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={redirectHome}
          >
            Home
          </MenuItem>
          <MenuItem
            className="logout"
            disableRipple={true}
            disableTouchRipple={true}
            onClick={redirectLogout}
          >
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText inset={true} primary={'Logout'} />
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  };
  public render() {
    return (
      <AppBar position="fixed" color="inherit">
        <Toolbar className="homenav-wrapper">
          <div>
            <Icon
              onClick={this.toggleMenu}
              className="iconButton"
              aria-label="Menu"
            >
              <MenuIcon />
            </Icon>
          </div>
          {this.menuLinks()}
          <SwipeableDrawer
            className="drawer"
            open={this.state.isOpen}
            onOpen={this.toggleMenu}
            onClose={this.toggleMenu}
          >
            {this.menuLinks()}
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    );
  }
}

export default HomeNav;
