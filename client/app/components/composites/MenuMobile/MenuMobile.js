import { Component, PropTypes } from 'react';
import r, { div } from 'r-dom';
import classNames from 'classnames';

import { className } from '../../../utils/PropTypes';

import css from './MenuMobile.css';
import OffScreenMenu from './OffScreenMenu';
import MenuLabelMobile from './MenuLabelMobile';
import NotificationBadge from '../../elements/NotificationBadge/NotificationBadge';

class MenuMobile extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });// eslint-disable-line react/no-set-state
  }

  closeMenu() {
    this.setState({ isOpen: false });// eslint-disable-line react/no-set-state
  }

  render() {
    const overlayColor = this.props.color ? this.props.color : 'black';
    const openClass = this.state.isOpen ? css.canvasOpen : '';
    const extraClasses = this.props.extraClasses ? this.props.extraClasses : '';
    const notificationBadgeInArray = this.props.notificationCount > 0 ?
      [r(NotificationBadge, { className: css.notificationBadge }, this.props.notificationCount)] :
      [];
    return div({
      className: classNames(this.props.className, 'MenuMobile', css.menuMobile, extraClasses, openClass),
      tabIndex: 0,
    }, [
      div({
        style: { backgroundColor: overlayColor },
        onClick: this.closeMenu,
        className: `MenuMobile_overlay ${css.overlay}`,
      }),
      r(MenuLabelMobile, {
        name: this.props.name,
        handleClick: this.handleClick,
      }, notificationBadgeInArray),
      r(OffScreenMenu, {
        toggleOpen: this.closeMenu,
        isOpen: this.state.isOpen,
        color: overlayColor,
        menuLinksTitle: this.props.menuLinksTitle,
        menuLinks: this.props.menuLinks,
        userLinksTitle: this.props.userLinksTitle,
        userLinks: this.props.userLinks,
        avatar: this.props.avatar,
        newListingButton: this.props.newListingButton,
        loginLinks: this.props.loginLinks,
      }),
    ]);
  }
}

const { arrayOf, bool, node, number, object, oneOfType, shape, string } = PropTypes;

MenuMobile.propTypes = {
  name: string.isRequired,
  extraClasses: string,
  identifier: string.isRequired,
  color: string,
  menuLinksTitle: string,
  menuLinks: arrayOf(
    shape({
      active: bool.isRequired,
      activeColor: string.isRequired,
      content: string.isRequired,
      href: string.isRequired,
      type: string.isRequired,
    })
  ).isRequired,
  userLinksTitle: string,
  userLinks: arrayOf(
    PropTypes.shape({
      active: bool.isRequired,
      activeColor: string.isRequired,
      content: oneOfType([
        PropTypes.arrayOf(node),
        node,
      ]).isRequired,
      href: string.isRequired,
      type: string.isRequired,
    })
  ),
  className,
  avatar: object, // eslint-disable-line react/forbid-prop-types
  newListingButton: object, // eslint-disable-line react/forbid-prop-types
  loginLinks: object, // eslint-disable-line react/forbid-prop-types
  notificationCount: number,
};

export default MenuMobile;
