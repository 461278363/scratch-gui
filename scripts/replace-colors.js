#!/usr/bin/env node
// ==============================================
// 批量替换脚本：将组件CSS中的 $变量 替换为 var()
//
// 用法：node scripts/replace-colors.js
// 效果：$motion-primary → var(--motion-primary, #4C97FF)
// ==============================================

const fs = require('fs');
const path = require('path');

// 需要处理的文件列表
const CSS_FILES = [
  'src/components/alerts/alert.css',
  'src/components/alerts/inline-message.css',
  'src/components/asset-panel/asset-panel.css',
  'src/components/asset-panel/selector.css',
  'src/components/audio-trimmer/audio-trimmer.css',
  'src/components/backpack/backpack.css',
  'src/components/blocks/blocks.css',
  'src/components/browser-modal/browser-modal.css',
  'src/components/cards/card.css',
  'src/components/close-button/close-button.css',
  'src/components/coming-soon/coming-soon.css',
  'src/components/connection-modal/connection-modal.css',
  'src/components/context-menu/context-menu.css',
  'src/components/crash-message/crash-message.css',
  'src/components/custom-procedures/custom-procedures.css',
  'src/components/debug-modal/debug-modal.css',
  'src/components/delete-button/delete-button.css',
  'src/components/delete-confirmation-prompt/delete-confirmation-prompt.css',
  'src/components/direction-picker/dial.css',
  'src/components/divider/divider.css',
  'src/components/drag-layer/drag-layer.css',
  'src/components/filter/filter.css',
  'src/components/forms/input.css',
  'src/components/forms/label.css',
  'src/components/green-flag/green-flag.css',
  'src/components/gui/gui.css',
  'src/components/icon-button/icon-button.css',
  'src/components/language-selector/language-selector.css',
  'src/components/library/library.css',
  'src/components/library-item/library-item.css',
  'src/components/loader/loader.css',
  'src/components/loupe/loupe.css',
  'src/components/menu/menu.css',
  'src/components/menu-bar/account-nav.css',
  'src/components/menu-bar/author-info.css',
  'src/components/menu-bar/community-button.css',
  'src/components/menu-bar/menu-bar.css',
  'src/components/menu-bar/project-title-input.css',
  'src/components/menu-bar/share-button.css',
  'src/components/menu-bar/user-avatar.css',
  'src/components/meter/meter.css',
  'src/components/modal/modal.css',
  'src/components/monitor/monitor.css',
  'src/components/play-button/play-button.css',
  'src/components/progress-ring/progress-ring.css',
  'src/components/prompt/prompt.css',
  'src/components/question/question.css',
  'src/components/record-modal/record-modal.css',
  'src/components/slider-prompt/slider-prompt.css',
  'src/components/sound-editor/sound-editor.css',
  'src/components/spinner/spinner.css',
  'src/components/sprite-info/sprite-info.css',
  'src/components/sprite-selector/sprite-selector.css',
  'src/components/sprite-selector-item/sprite-selector-item.css',
  'src/components/stage/stage.css',
  'src/components/stage-header/stage-header.css',
  'src/components/stage-selector/stage-selector.css',
  'src/components/stage-wrapper/stage-wrapper.css',
  'src/components/stop-all/stop-all.css',
  'src/components/tag-button/tag-button.css',
  'src/components/telemetry-modal/telemetry-modal.css',
  'src/components/toggle-buttons/toggle-buttons.css',
  'src/components/turbo-mode/turbo-mode.css',
  'src/components/waveform/waveform.css',
  'src/components/webgl-modal/webgl-modal.css',
];

// 替换映射表：$变量名 → var(--变量名, 回退值)
// 顺序很重要：长变量名必须排在前面，避免子串误匹配
const REPLACEMENTS = [
  // ---------- 最长的变量名 ----------
  ['$ui-black-transparent-10',     'var(--ui-black-transparent-10, hsla(0, 0%, 0%, 0.10))'],
  ['$text-primary-transparent',    'var(--text-primary-transparent, hsla(225, 15%, 40%, 0.75))'],
  ['$looks-light-transparent',     'var(--looks-light-transparent, hsla(260, 60%, 60%, 0.15))'],
  ['$looks-secondary-dark',        'var(--looks-secondary-dark, #714EB6)'],
  ['$extensions-transparent',      'var(--extensions-transparent, hsla(163, 85%, 40%, 0.35))'],
  ['$ui-white-transparent',        'var(--ui-white-transparent, hsla(0, 100%, 100%, 0.25))'],
  ['$ui-black-transparent',        'var(--ui-black-transparent, hsla(0, 0%, 0%, 0.15))'],
  ['$ui-modal-overlay',            'var(--ui-modal-overlay, hsla(215, 100%, 65%, 0.9))'],
  // ---------- 中等长度的变量名 ----------
  ['$looks-transparent',           'var(--looks-transparent, hsla(260, 60%, 60%, 0.35))'],
  ['$pen-transparent',             'var(--pen-transparent, hsla(163, 85%, 40%, 0.25))'],
  ['$error-transparent',           'var(--error-transparent, hsla(30, 100%, 55%, 0.25))'],
  ['$drop-highlight',              'var(--drop-highlight, hsla(215, 100%, 77%, 1))'],
  ['$extensions-primary',          'var(--extensions-primary, #0FBD8C)'],
  ['$extensions-tertiary',         'var(--extensions-tertiary, #0B8E69)'],
  ['$extensions-light',            'var(--extensions-light, hsla(163, 57%, 85%, 1))'],
  ['$motion-primary',              'var(--motion-primary, #4C97FF)'],
  ['$motion-tertiary',             'var(--motion-tertiary, #3373CC)'],
  ['$looks-secondary',             'var(--looks-secondary, #855CD6)'],
  ['$control-primary',             'var(--control-primary, #FFAB19)'],
  ['$sound-primary',               'var(--sound-primary, #CF63CF)'],
  ['$sound-tertiary',              'var(--sound-tertiary, #BD42BD)'],
  ['$error-primary',               'var(--error-primary, #FF8C1A)'],
  ['$error-light',                 'var(--error-light, #FFB366)'],
  ['$pen-primary',                 'var(--pen-primary, #0FBD8C)'],
  ['$pen-tertiary',                'var(--pen-tertiary, #0B8E69)'],
  ['$data-primary',                'var(--data-primary, #FF8C1A)'],
  ['$text-primary',                'var(--text-primary, #575E75)'],
  ['$red-primary',                 'var(--red-primary, #FF661A)'],
  ['$red-tertiary',                'var(--red-tertiary, #E64D00)'],
  ['$ui-primary',                  'var(--ui-primary, #E5F0FF)'],
  ['$ui-secondary',                'var(--ui-secondary, #E9F1FC)'],
  ['$ui-tertiary',                 'var(--ui-tertiary, #D9E3F2)'],
  ['$ui-white-dim',                'var(--ui-white-dim, hsla(0, 100%, 100%, 0.75))'],
  ['$ui-white',                    'var(--ui-white, #FFFFFF)'],
  ['$ui-transparent',              'var(--ui-transparent, hsla(0, 100%, 100%, 0))'],
  ['$ui-green-2',                  'var(--ui-green-2, #0FBD8C)'],
  ['$ui-green',                    'var(--ui-green, #0DA57A)'],
];

console.log('================================================');
console.log('  开始批量替换 SCSS 变量为 CSS 自定义属性');
console.log(`  共 ${CSS_FILES.length} 个文件`);
console.log('================================================');
console.log('');

let totalReplacements = 0;

for (const cssFile of CSS_FILES) {
  const filePath = path.join(__dirname, '..', cssFile);

  if (!fs.existsSync(filePath)) {
    console.log(`  [跳过] ${cssFile} (文件不存在)`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let fileReplacements = 0;

  for (const [oldVar, newVar] of REPLACEMENTS) {
    // 使用全局替换
    // 注意：oldVar 以 $ 开头，需要进行转义才能在正则中使用
    const escapedOld = oldVar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedOld, 'g');
    const matchCount = (content.match(regex) || []).length;

    if (matchCount > 0) {
      content = content.replace(regex, newVar);
      fileReplacements += matchCount;
    }
  }

  if (fileReplacements > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  [完成] ${cssFile} (${fileReplacements} 处替换)`);
    totalReplacements += fileReplacements;
  } else {
    console.log(`  [无变化] ${cssFile}`);
  }
}

console.log('');
console.log('================================================');
console.log(`  替换完成！总计 ${totalReplacements} 处替换`);
console.log('================================================');
console.log('');
console.log('下一步：');
console.log('1. 用 git diff -- src/components/ 查看改动');
console.log('2. 刷新 http://localhost:8601 看效果');
console.log('3. 在 Settings → Theme 菜单中切换 Bright/Dark 测试');
