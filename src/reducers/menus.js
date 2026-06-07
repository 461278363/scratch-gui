const OPEN_MENU = 'scratch-gui/menus/OPEN_MENU';
const CLOSE_MENU = 'scratch-gui/menus/CLOSE_MENU';
const SELECT_UI_SIZE = 'scratch-gui/menus/SELECT_UI_SIZE';
const SELECT_BRIGHT_DARK = 'scratch-gui/menus/SELECT_BRIGHT_DARK';

const MENU_ABOUT = 'aboutMenu';
const MENU_ACCOUNT = 'accountMenu';
const MENU_BRIGHT_DARK = 'brightDarkMenu';
const MENU_EDIT = 'editMenu';
const MENU_FILE = 'fileMenu';
const MENU_LANGUAGE = 'languageMenu';
const MENU_LOGIN = 'loginMenu';
const MENU_MODE = 'modeMenu';
const MENU_SETTINGS = 'settingsMenu';
const MENU_THEME = 'themeMenu';
const MENU_UI_SIZE = 'uiSizeMenu';

class Menu {
    constructor (id) {
        this.id = id;
        this.children = [];
        this.parent = null;
    }

    addChild (menu) {
        this.children.push(menu);
        menu.parent = this;
        return this;
    }

    descendants () {
        return this.children.flatMap(child => [child, ...child.descendants()]);
    }

    siblings () {
        if (!this.parent) return [];

        return this.parent.children.filter(child => child.id !== this.id);
    }

    findById (id) {
        if (this.id === id) return this;

        for (const child of this.children) {
            const found = child.findById(id);
            if (found) return found;
        }

        return null;
    }
}

// Structure of nested menus, used for collapsing submenus logic.
const rootMenu = new Menu('root')
    .addChild(
        new Menu(MENU_SETTINGS)
            .addChild(new Menu(MENU_LANGUAGE))
            .addChild(new Menu(MENU_THEME))
            .addChild(new Menu(MENU_UI_SIZE))
            .addChild(new Menu(MENU_BRIGHT_DARK))
    )
    .addChild(new Menu(MENU_FILE))
    .addChild(new Menu(MENU_EDIT))
    .addChild(new Menu(MENU_MODE))
    .addChild(new Menu(MENU_SETTINGS))
    .addChild(new Menu(MENU_LOGIN))
    .addChild(new Menu(MENU_ACCOUNT))
    .addChild(new Menu(MENU_ABOUT));

const initialState = {
    [MENU_ABOUT]: false,
    [MENU_ACCOUNT]: false,
    [MENU_BRIGHT_DARK]: false,
    [MENU_EDIT]: false,
    [MENU_FILE]: false,
    [MENU_LANGUAGE]: false,
    [MENU_LOGIN]: false,
    [MENU_MODE]: false,
    [MENU_SETTINGS]: false,
    [MENU_THEME]: false,
    [MENU_UI_SIZE]: false,
    // 当前选中的 UI Size 和 Theme 选项
    uiSize: typeof localStorage !== 'undefined' ? (localStorage.getItem('scratchUISize') || 'default') : 'default',
    brightDark: typeof localStorage !== 'undefined' ? (localStorage.getItem('scratchBrightDark') || 'bright') : 'bright'
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case OPEN_MENU: {
        const menu = rootMenu.findById(action.menu);
        // Close siblings when opening a menu
        const toClose = menu.siblings().flatMap(sibling => [sibling, ...sibling.descendants()]);

        return {
            ...state,
            [action.menu]: true,
            ...Object.fromEntries(toClose.map(({id}) => [id, false]))
        };
    }
    case CLOSE_MENU: {
        const menu = rootMenu.findById(action.menu);
        // Close this menu and any submenus
        const toClose = [menu, ...menu.descendants()];

        return {
            ...state,
            ...Object.fromEntries(toClose.map(({id}) => [id, false]))
        };
    }
    case SELECT_UI_SIZE:
        return {...state, uiSize: action.size};
    case SELECT_BRIGHT_DARK:
        return {...state, brightDark: action.option};
    default:
        return state;
    }
};
const openMenu = menu => ({
    type: OPEN_MENU,
    menu: menu
});
const closeMenu = menu => ({
    type: CLOSE_MENU,
    menu: menu
});

const openAboutMenu = () => openMenu(MENU_ABOUT);
const closeAboutMenu = () => closeMenu(MENU_ABOUT);
const aboutMenuOpen = state => state.scratchGui.menus[MENU_ABOUT];

const openAccountMenu = () => openMenu(MENU_ACCOUNT);
const closeAccountMenu = () => closeMenu(MENU_ACCOUNT);
const accountMenuOpen = state => state.scratchGui.menus[MENU_ACCOUNT];

const openBrightDarkMenu = () => openMenu(MENU_BRIGHT_DARK);
const closeBrightDarkMenu = () => closeMenu(MENU_BRIGHT_DARK);
const brightDarkMenuOpen = state => state.scratchGui.menus[MENU_BRIGHT_DARK];

const openEditMenu = () => openMenu(MENU_EDIT);
const closeEditMenu = () => closeMenu(MENU_EDIT);
const editMenuOpen = state => state.scratchGui.menus[MENU_EDIT];

const openFileMenu = () => openMenu(MENU_FILE);
const closeFileMenu = () => closeMenu(MENU_FILE);
const fileMenuOpen = state => state.scratchGui.menus[MENU_FILE];

const openLanguageMenu = () => openMenu(MENU_LANGUAGE);
const closeLanguageMenu = () => closeMenu(MENU_LANGUAGE);
const languageMenuOpen = state => state.scratchGui.menus[MENU_LANGUAGE];

const openLoginMenu = () => openMenu(MENU_LOGIN);
const closeLoginMenu = () => closeMenu(MENU_LOGIN);
const loginMenuOpen = state => state.scratchGui.menus[MENU_LOGIN];

const openModeMenu = () => openMenu(MENU_MODE);
const closeModeMenu = () => closeMenu(MENU_MODE);
const modeMenuOpen = state => state.scratchGui.menus[MENU_MODE];

const openSettingsMenu = () => openMenu(MENU_SETTINGS);
const closeSettingsMenu = () => closeMenu(MENU_SETTINGS);
const settingsMenuOpen = state => state.scratchGui.menus[MENU_SETTINGS];

const openThemeMenu = () => openMenu(MENU_THEME);
const closeThemeMenu = () => closeMenu(MENU_THEME);
const themeMenuOpen = state => state.scratchGui.menus[MENU_THEME];

const openUISizeMenu = () => openMenu(MENU_UI_SIZE);
const closeUISizeMenu = () => closeMenu(MENU_UI_SIZE);
const uiSizeMenuOpen = state => state.scratchGui.menus[MENU_UI_SIZE];

// UI Size 选中状态
const selectUISize = size => ({type: SELECT_UI_SIZE, size});
const selectedUISize = state => state.scratchGui.menus.uiSize;

// Bright/Dark Theme 选中状态
const selectBrightDark = option => ({type: SELECT_BRIGHT_DARK, option});
const selectedBrightDark = state => state.scratchGui.menus.brightDark;

export {
    reducer as default,
    initialState as menuInitialState,
    openAboutMenu,
    closeAboutMenu,
    aboutMenuOpen,
    openAccountMenu,
    closeAccountMenu,
    accountMenuOpen,
    openBrightDarkMenu,
    closeBrightDarkMenu,
    brightDarkMenuOpen,
    openEditMenu,
    closeEditMenu,
    editMenuOpen,
    openFileMenu,
    closeFileMenu,
    fileMenuOpen,
    openLanguageMenu,
    closeLanguageMenu,
    languageMenuOpen,
    openLoginMenu,
    closeLoginMenu,
    loginMenuOpen,
    openModeMenu,
    closeModeMenu,
    modeMenuOpen,
    openSettingsMenu,
    closeSettingsMenu,
    settingsMenuOpen,
    openThemeMenu,
    closeThemeMenu,
    themeMenuOpen,
    openUISizeMenu,
    closeUISizeMenu,
    uiSizeMenuOpen,
    selectUISize,
    selectedUISize,
    selectBrightDark,
    selectedBrightDark
};
