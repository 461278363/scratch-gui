import keyMirror from 'keymirror';

/**
 * Names for each state of the stage size toggle
 * @enum {string}
 */
const STAGE_SIZE_MODES = keyMirror({
    /**
     * The "large stage" button is pressed; the user would like a large stage.
     */
    large: null,

    /**
     * The "small stage" button is pressed; the user would like a small stage.
     */
    small: null,

    /**
     * The "extra large stage" button is pressed; the user would like an extra large stage.
     */
    extraLarge: null
});

/**
 * Names for each stage render size
 * @enum {string}
 */
const STAGE_DISPLAY_SIZES = keyMirror({
    /**
     * Large stage with wide browser
     */
    large: null,

    /**
     * Large stage with narrow browser
     */
    largeConstrained: null,

    /**
     * Small stage (ignores browser width)
     */
    small: null,

    /**
     * Extra large stage (ignores browser width)
     */
    extraLarge: null
});

// 积木默认缩放比例（根据 UI Size 动态计算）
// @param {string} uiSize - 'default' | 'large' | 'extraLarge'
// @returns {number} 缩放比例
const BLOCKS_DEFAULT_SCALE = uiSize => {
    const scales = {
        default: 0.675,
        large: 0.85,
        extraLarge: 1.0
    };
    return scales[uiSize] || 0.675;
};

// 工具箱积木列表（flyout）宽度（根据 UI Size 动态计算）
// @param {string} uiSize - 'default' | 'large' | 'extraLarge'
// @returns {number} 宽度（px）
const getFlyoutWidth = uiSize => {
    const widths = {
        default: 250,
        large: 290,
        extraLarge: 340
    };
    return widths[uiSize] || 250;
};

const STAGE_DISPLAY_SCALES = {};
STAGE_DISPLAY_SCALES[STAGE_DISPLAY_SIZES.large] = 1; // large mode, wide browser (standard)
STAGE_DISPLAY_SCALES[STAGE_DISPLAY_SIZES.largeConstrained] = 0.85; // large mode but narrow browser
STAGE_DISPLAY_SCALES[STAGE_DISPLAY_SIZES.small] = 0.5; // small mode, regardless of browser size
STAGE_DISPLAY_SCALES[STAGE_DISPLAY_SIZES.extraLarge] = 1.5; // extra large mode (972×729)

export default {
    standardStageWidth: 648,
    standardStageHeight: 486,
    fullSizeMinWidth: 1096,
    fullSizePaintMinWidth: 1250
};

export {
    BLOCKS_DEFAULT_SCALE,
    getFlyoutWidth,
    STAGE_DISPLAY_SCALES,
    STAGE_DISPLAY_SIZES,
    STAGE_SIZE_MODES
};
