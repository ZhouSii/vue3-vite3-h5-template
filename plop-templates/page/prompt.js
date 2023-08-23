const {
  notEmpty,
  toFirstUpper
} = require('../utils.js')

module.exports = {
  description: 'generate a page',
  prompts: [{
      type: 'input',
      name: 'name',
      message: 'page name please',
      validate: notEmpty('name')
    },
    {
      type: 'input',
      name: 'routerTitle',
      message: 'page routerTitle please',
      validate: notEmpty('routerTitle')
    },
    {
      type: 'checkbox',
      name: 'blocks',
      message: 'Blocks:',
      choices: [{
          name: '<template>',
          value: 'template',
          checked: true
        },
        {
          name: '<mPage>',
          value: 'mPage',
          checked: false
        },
        {
          name: '<script>',
          value: 'script',
          checked: true
        },
        {
          name: 'style',
          value: 'style',
          checked: true
        }
      ],
      validate(value) {
        if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
          return 'View require at least a <script> or <template> tag.'
        }
        return true
      }
    }
  ],
  actions: data => {
    const name = '{{name}}'
    const actions = [{
        type: 'add',
        path: `src/views/${name}/index.vue`,
        templateFile: 'plop-templates/page/index.hbs',
        data: {
          name: name,
          template: data.blocks.includes('template'),
          mPage: data.blocks.includes('mPage'),
          script: data.blocks.includes('script'),
          style: data.blocks.includes('style'),
        }
      },
      {
        type: 'add',
        path: `src/router/modules/${name}.ts`,
        templateFile: 'plop-templates/router/index.hbs',
        data: {
          name: name,
          routerTitle: '{{routerTitle}}'
        }
      }
    ]

    return actions
  }
}
