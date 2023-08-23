import type { App } from 'vue'
import copyText from './common/copyText'
import clearEmoji from './common/clearEmoji'
import hasPermi from './permission/hasPermi'

export function setupGlobalDirective(app: App<Element>) {
  app.directive('hasPermi', hasPermi)
  app.directive('copyText', copyText)
  app.directive('clearEmoji', clearEmoji)
}
