import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
//@ts-ignore
import viteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import viteImagemin from 'vite-plugin-imagemin'
import autoprefixer from 'autoprefixer'
//auto import vue https://www.npmjs.com/package/unplugin-auto-import
import AutoImport from 'unplugin-auto-import/vite'
//inject title
import { createHtmlPlugin } from 'vite-plugin-html'
import setting from './src/settings'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import postcsspxtoviewport from 'postcss-px-to-viewport'
import pluginUnocss from 'unocss/vite'
import unocssOptions from './unocssOptions'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import vueJSX from '@vitejs/plugin-vue-jsx'

// const { svgBuilder } = require('./src/icons/index.ts')

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  // const processEnv = loadEnv(mode, process.cwd())

  // console.log('processEnv.VITE_APP_BASE_API:', processEnv.VITE_APP_BASE_API)
  // console.log('processEnv.VITE_APP_BASE_URL:', processEnv.VITE_APP_BASE_URL)

  return {
    base: setting.viteBasePath, //打包路径
    plugins: [
      pluginUnocss(unocssOptions),
      vue(),
      vueJSX(),
      VueSetupExtend(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[name]',
      }),
      Components({
        resolvers: [VantResolver()],
      }),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      // svgBuilder('./src/icons/svg/'),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            '@/hooks/global/useCommon': ['useCommon'],
            '@/hooks/global/useVant': ['useVant'],
            '@/hooks/global/useVueRouter': ['useVueRouter'],
            '@/hooks/global/useTrack': ['useTrack'],
            '@/hooks/global/useApp': ['useApp'],
            // '@/service/http': ['axiosReq'],
          },
        ],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: true, //auto generation auto-imports.d.ts file
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          // Inject data into ejs template
          data: {
            title: setting.title,
          },
        },
      }),
      viteImagemin({
        // 无损压缩配置，无损压缩下图片质量不会变差
        optipng: {
          optimizationLevel: 7,
        },
        // 有损压缩配置，有损压缩下图片质量可能会变差
        pngquant: {
          quality: [0.8, 0.9],
        },
        // svg 优化
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
    ],
    // 配置别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      // 进行 PostCSS 配置
      postcss: {
        plugins: [
          autoprefixer({
            // 指定目标浏览器
            overrideBrowserslist: ['> 1%', 'last 2 versions'],
          }),
          postcsspxtoviewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 375, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false, // 是否处理横屏情况
          }),
        ],
      },
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: '@import "@/styles/variables.scss";',
        },
      },
    },
    //启动服务配置
    server: {
      //设置 server.hmr.overlay 为 false 可以禁用开发服务器错误的屏蔽。
      hmr: { overlay: false },
      host: '0.0.0.0',
      port: 8199,
      open: true,
      https: false,
      proxy: {
        '/api': {
          target: 'http://eoa.qa.elonghotel.com/',
          changeOrigin: true,
          rewrite: () => '',
        },
      },
    },
    // 生产环境打包配置
    //去除 console debugger
    build: {
      minify: 'terser', //默认modules
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 5000,
      //remote console.log in prod
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      //build assets Separate
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  }
}
