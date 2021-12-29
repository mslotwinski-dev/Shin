import { ProjectOptions } from '@vue/cli-service'
import * as path from 'path'

const vueConfig: ProjectOptions = {
  pwa: {
    name: 'Shin',
    themeColor: '#c3002f',
    appleMobileWebAppCapable: 'yes',
    workboxPluginMode: 'GenerateSW',
  },

  configureWebpack: {
    devServer: {
      historyApiFallback: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '>>': path.resolve(__dirname, 'public/'),
      },
    },
  },

  devServer: {
    port: 4000,
    host: 'localhost',
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
}

module.exports = vueConfig
