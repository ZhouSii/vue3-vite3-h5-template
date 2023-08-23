import { VitePluginConfig } from 'unocss/vite'
import { presetAttributify, presetWind, presetIcons } from 'unocss'

const options: VitePluginConfig = {
  presets: [presetAttributify(), presetWind({}), presetIcons()],
  shortcuts: {
    'flex-c': 'flex justify-center items-center',
    'flex-b': 'flex justify-between items-center',
  },
  rules: [
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: '1px solid var(--edt-c-gray-light-4)',
      }),
    ],
    [
      'menu-item-before',
      {
        'margin-right': '12px',
        'margin-left': '12px',
        width: '1px',
        height: '24px',
        'background-color': 'var(--island-c-divider-light)',
        content: '" "',
      },
    ],
  ],
  theme: {
    colors: {
      custom: {
        bg: 'rgb(237, 240, 247)',
        gray: 'var(--edt-c-gray-light-4)',
        blue: 'var(--edt-c-blue-base)',
        green: 'var(--edt-c-green)',
        red: 'var(--edt-c-red-light)',
      },
      text: {
        1: 'var(--edt-c-black-1)',
        2: 'var(--edt-c-gray)',
      },
      tips: {
        1: 'var(--edt-c-green)',
        2: 'var(--edt-tips-yellow)',
        3: 'var(--edt-tips-purple)',
      },
      divider: {
        default: 'var(--edt-c-divider)',
        light: 'var(--edt-c-divider-light)',
        dark: 'var(--edt-c-divider-dark)',
        gray: 'var(--edt-c-gray-light-5)',
      },
    },
  },
}

export default options
