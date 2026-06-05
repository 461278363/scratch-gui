import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';

import check from './check.svg';
import {MenuItem, Submenu} from '../menu/menu.jsx';
import {
    openUISizeMenu,
    selectUISize,
    selectedUISize,
    uiSizeMenuOpen
} from '../../reducers/menus.js';

import styles from './settings-menu.css';

import dropdownCaret from './dropdown-caret.svg';

// UI Size 的三个选项
const UI_SIZE_OPTIONS = [
    {
        key: 'default',
        label: {
            defaultMessage: 'Default',
            description: 'Default UI size option',
            id: 'gui.uiSize.default'
        }
    },
    {
        key: 'large',
        label: {
            defaultMessage: 'Large',
            description: 'Large UI size option',
            id: 'gui.uiSize.large'
        }
    },
    {
        key: 'extraLarge',
        label: {
            defaultMessage: 'Extra Large',
            description: 'Extra Large UI size option',
            id: 'gui.uiSize.extraLarge'
        }
    }
];

const UISizeMenu = ({
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
                    defaultMessage="UI Size"
                    description="UI Size sub-menu"
                    id="gui.menuBar.uiSize"
                />
            </span>
            <img
                className={styles.expandCaret}
                src={dropdownCaret}
            />
        </div>
        <Submenu place={isRtl ? 'left' : 'right'}>
            {UI_SIZE_OPTIONS.map(option => (
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

UISizeMenu.propTypes = {
    isRtl: PropTypes.bool,
    menuOpen: PropTypes.bool,
    onRequestCloseSettings: PropTypes.func,
    onRequestOpen: PropTypes.func,
    onSelect: PropTypes.func,
    selected: PropTypes.string
};

const mapStateToProps = state => ({
    isRtl: state.locales.isRtl,
    menuOpen: uiSizeMenuOpen(state),
    selected: selectedUISize(state)
});

const mapDispatchToProps = dispatch => ({
    onRequestOpen: () => dispatch(openUISizeMenu()),
    onSelect: size => dispatch(selectUISize(size))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UISizeMenu);
