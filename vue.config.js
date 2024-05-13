/**
 * @description vue.config.js全局配置
 */
const path = require('path')
const {
  baseURL,
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  abbreviation,
  // devPort,
  providePlugin,
  build7z,
} = require('./src/config')
const { webpackBarName, webpackBanner } = require('vab-config')

const { version, author } = require('./package.json')
const Webpack = require('webpack')
const WebpackBar = require('webpackbar')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const dayjs = require('dayjs')
const date = dayjs().format('YYYY_M_D')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_TITLE = title || 'anjuhuiyun'
process.env.VUE_APP_AUTHOR = author || 'anjuhuiyun'
process.env.VUE_APP_UPDATE_TIME = time
process.env.VUE_APP_VERSION = version

const isProd = process.env.NODE_ENV === 'production'
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
//
// const mockServer = () => {
//   if (process.env.NODE_ENV === 'development') {
//     return require('./mock/mockServer.js')
//   } else {
//     return ''
//   }
// }
// const assetsCDN = {
//   externals: {
//     vue: 'Vue',
//     'vue-router': 'VueRouter',
//     vuex: 'Vuex',
//     axios: 'axios',
//   },
//   css: [],
//   js: [
//     'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
//     'https://cdn.bootcdn.net/ajax/libs/vue/3.2.45/vue.global.min.js',
//     'https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.10/vue-router.global.min.js',
//     'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.2/vuex.global.min.js',
//   ],
// }

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: '8080',
    // open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    // 注释掉的地方是前端配置代理访问后端的示例
    proxy: {
      [baseURL]: {
        target: `http://192.168.1.183`,
        //  target: `http://192.168.1.172`,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^/' + baseURL]: '',
        },
      },
    },
    // after: mockServer(),
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          '*': resolve(''),
        },
      },
      plugins: [
        new Webpack.ProvidePlugin(providePlugin),
        new WebpackBar({
          name: webpackBarName,
        }),
      ],
      // externals: isProd ? assetsCDN.externals : {},
    }
  },
  chainWebpack(config) {
    config.resolve.symlinks(true)
    config.module.rule('svg').exclude.add(resolve('src/icon/remixIcon')).end()

    config.module
      .rule('remixIcon')
      .test(/\.svg$/)
      .include.add(resolve('src/icon/remixIcon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'remix-icon-[name]' })
      .end()

    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.devtool('source-map')
    })

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.performance.set('hints', false)
      config.devtool('none')
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'ajhy',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
        },
      })
      config
        .plugin('banner')
        .use(Webpack.BannerPlugin, [`${webpackBanner}${time}`])
        .end()
      // config.module
      //   .rule('images')
      //   .use('image-webpack-loader')
      //   .loader('image-webpack-loader')
      //   .options({
      //     bypassOnDebug: true,
      //   })
      //   .end()
    })

    if (build7z) {
      config.when(process.env.NODE_ENV === 'production', (config) => {
        config
          .plugin('fileManager')
          .use(FileManagerPlugin, [
            {
              onEnd: {
                delete: [`./${outputDir}/video`, `./${outputDir}/data`],
                archive: [
                  {
                    source: `./${outputDir}`,
                    destination: `./${outputDir}/${abbreviation}_${outputDir}_${date}.7z`,
                  },
                ],
              },
            },
          ])
          .end()
      })
    }
    // if (isProd) {
    //   config.plugin('html').tap((args) => {
    //     args[0].cdn = assetsCDN
    //     return args
    //   })
    // }
    // 只有在生产环境下才打开压缩
    if (isProd) {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/, //匹配文件名
          threshold: 10240, //对超过10k的数据压缩
          minRatio: 0.8, //压缩比
          deleteOriginalAssets: false, // 不能删除源文件，不然报错"Uncaught SyntaxError: Unexpected token <"
        })
      )
    }
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'vab-color-blue': '#1890ff',
            'vab-margin': '20px',
            'vab-padding': '20px',
            'vab-header-height': '65px',
          },
        },
      },
    },
  },
}
