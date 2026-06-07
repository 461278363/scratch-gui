/**
 * ============================================================
 * 主题颜色控制面板 ② — 积木组件颜色（Dark 主题）
 * ============================================================
 *
 * 主题文件地图：
 *   [1] src/css/colors.css                  全局 UI 颜色
 *   [2 本文件]                               积木组件颜色
 *   [3] src/components/blocks/blocks.css     积木区环境样式
 *
 * 修改指南：
 *   1. shared.secondary = 所有积木主体填充色（改一处全变）
 *   2. 每个分类的 primary/tertiary = 只影响该分类
 *   3. 底部全局颜色（text, workspace, flyout 等）
 *
 * 修改后切换 Bright-Dark 主题即可生效。
 * ============================================================
 */

// 共享颜色 — 改一处，所有积木生效
const shared = {
    secondary: '#272727'   // 所有积木的主体填充色
};

// 各分类独立颜色
const blockColors = {
    motion: {
        primary: '#1E3C66',         // 外边框、缺口连接处
        secondary: shared.secondary, // 主体填充色（跟随 shared）
        tertiary: '#4C97FF',        // 输入框背景、高亮边条
        quaternary: '#4C97FF'       // 细节色
    },
    looks: {
        primary: '#3C2866',         // 外边框、缺口连接处（紫）
        secondary: shared.secondary, // 主体填充色（跟随 shared）
        tertiary: '#9966FF',        // 输入框背景、高亮边条
        quaternary: '#9966FF'       // 细节色
    },
    sounds: {
        primary: '#522652',         // 外边框、缺口连接处（品红）
        secondary: shared.secondary, // 主体填充色（跟随 shared）
        tertiary: '#CF63CF',        // 输入框背景、高亮边条
        quaternary: '#CF63CF'       // 细节色
    },
    control: {
        primary: '#69470d',         // 外边框、缺口连接处（橙黄）
        secondary: shared.secondary, // 主体填充色（跟随 shared）
        tertiary: '#FFAB19',        // 输入框背景、高亮边条
        quaternary: '#FFAB19'       // 细节色
    },
    event: {
        primary: '#664C00',         // 外边框、缺口连接处（黄）
        secondary: shared.secondary, // 主体填充色（跟随 shared）
        tertiary: '#FFBF00',        // 输入框背景、高亮边条
        quaternary: '#FFBF00'       // 细节色
    },
    sensing: {
        primary: '#244654',         // 外边框、缺口连接处（青）
        secondary: shared.secondary, // 主体填充色（跟随 shared）
        tertiary: '#5CB1D6',        // 输入框背景、高亮边条
        quaternary: '#5CB1D6'       // 细节色
    },
    pen: {
        primary: '#064A38',         // 外边框、缺口连接处（绿）
        secondary: shared.secondary, // 主体填充色（跟随 shared）
        tertiary: '#0fBD8C',        // 输入框背景、高亮边条
        quaternary: '#0fBD8C'       // 细节色
    },
    operators: {
        primary: '#224C22',         // 外边框、缺口连接处（绿）
        secondary: shared.secondary, // 主体填充色（跟随 shared）
        tertiary: '#59C059',        // 输入框背景、高亮边条
        quaternary: '#59C059'       // 细节色
    },
    data: {
        primary: '#66380A',         // 外边框、缺口连接处（橙）
        secondary: shared.secondary, // 主体填充色（跟随 shared）
        tertiary: '#FF8C1A',        // 输入框背景、高亮边条
        quaternary: '#FF8C1A'       // 细节色
    },
    data_lists: {
        primary: '#66280A',         // 外边框、缺口连接处（橙红）
        secondary: shared.secondary, // 主体填充色（跟随 shared）
        tertiary: '#FF661A',        // 输入框背景、高亮边条
        quaternary: '#FF661A'       // 细节色
    },
    more: {
        primary: '#662832',         // 外边框、缺口连接处（粉红）
        secondary: shared.secondary, // 主体填充色（跟随 shared）
        tertiary: '#FF6680',        // 输入框背景、高亮边条
        quaternary: '#FF6680'       // 细节色
    },

    // 全局颜色
    text: 'rgba(255, 255, 255, 0.92)',        // 积木上的文字颜色
    textFieldText: '#E5E5E5',                  // 输入框内文字颜色
    workspace: '#121212',                      // 画布背景色
    toolboxSelected: '#4C4C4C',                // 分类栏选中高亮色
    toolboxText: '#E5E5E5',                    // 分类栏文字颜色
    toolbox: '#121212',                        // 分类栏背景色
    flyout: '#1A1A1A',                         // 积木列表背景色
    textField: '#4C4C4C',                     // 输入框背景色
    menuHover: 'rgba(255, 255, 255, 0.3)'      // 右键菜单悬停色
};

const extensions = {};

export {
    blockColors,
    extensions
};
