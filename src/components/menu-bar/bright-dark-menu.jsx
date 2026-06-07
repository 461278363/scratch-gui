import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';

import check from './check.svg';
import {MenuItem, Submenu} from '../menu/menu.jsx';
import {
    openBrightDarkMenu,
    brightDarkMenuOpen,
    selectBrightDark,
    selectedBrightDark
} from '../../reducers/menus.js';

import styles from './settings-menu.css';

import dropdownCaret from './dropdown-caret.svg';

// Theme 的两个选项
const THEME_OPTIONS = [
    {
        key: 'bright',
        label: {
            defaultMessage: 'Bright',
            description: 'Bright theme option',
            id: 'gui.theme.bright'
        }
    },
    {
        key: 'dark',
        label: {
            defaultMessage: 'Dark',
            description: 'Dark theme option',
            id: 'gui.theme.dark'
        }
    }
];

const BrightDarkMenu = ({
    isRtl,
    menuOpen,
    onRequestOpen,
    onRequestCloseSettings,
    onSelect,
    selected
}) => (
    <MenuItem expanded={menuOpen}>
        <div
            className={styles.option}
            onClick={onRequestOpen}
            // eslint-disable-next-line react/jsx-no-bind
            onMouseUp={e => e.stopPropagation()}
        >
            <span className={styles.submenuLabel}>
                <FormattedMessage
                    defaultMessage="Theme"
                    description="Theme sub-menu"
                    id="gui.menuBar.theme"
                />
            </span>
            <img
                className={styles.expandCaret}
                src={dropdownCaret}
            />
        </div>
        <Submenu place={isRtl ? 'left' : 'right'}>
            {THEME_OPTIONS.map(option => (
                <MenuItem
                    key={option.key}
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => {
                        onSelect(option.key);
                        onRequestCloseSettings();
                    }}
                >
                    <div className={styles.option}>
                        <img
                            className={classNames(styles.check, {
                                [styles.selected]: selected === option.key
                            })}
                            src={check}
                        />
                        <FormattedMessage {...option.label} />
                    </div>
                </MenuItem>
            ))}
        </Submenu>
    </MenuItem>
);

BrightDarkMenu.propTypes = {
    isRtl: PropTypes.bool,
    menuOpen: PropTypes.bool,
    onRequestCloseSettings: PropTypes.func,
    onRequestOpen: PropTypes.func,
    onSelect: PropTypes.func,
    selected: PropTypes.string
};

const mapStateToProps = state => ({
    isRtl: state.locales.isRtl,
    menuOpen: brightDarkMenuOpen(state),
    selected: selectedBrightDark(state)
});

const mapDispatchToProps = dispatch => ({
    onRequestOpen: () => dispatch(openBrightDarkMenu()),
    onSelect: option => {
        dispatch(selectBrightDark(option));
        // 持久化主题选择到 localStorage，以便刷新后保留
        localStorage.setItem('scratchBrightDark', option);
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrightDarkMenu);
