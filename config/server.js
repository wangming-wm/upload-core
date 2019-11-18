
const Webpack = require('webpack');
const webpackConfig = require('./webpack.dev');
const WebpackDevServer = require('webpack-dev-server');
const openBrowser = require('react-dev-utils/openBrowser');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const chalk = require('chalk');


const runServer = async (port, host) => {
  const compiler = await Webpack(webpackConfig);
  const devServerOption = {
    noInfo: true,
    stats: {
      colors: true,
    },
    historyApiFallback: {
      /* rewrites: [
        {
          from: /\/app\/task/,
          to: `/task`,
        }
      ] */
    },
    publicPath: `/`,
    hot: true,
    clientLogLevel: 'error',
    inline: true,
  }
  compiler.hooks.done.tap('done', stats => {
    // 下面代码报错，貌似是捕捉不到的
    const rawMessage = stats.toJson({}, true);
    const messages = formatWebpackMessages(rawMessage);
    if (!messages.errors.length && !messages.warnings.length) {
      //clearConsole();
      console.log(chalk.green(`编译成功${+new Date}`))
    }
    if (messages.errors.length) {
      console.log(chalk.red(`编译失败`));
      messages.errors.forEach(e => console.log(chalk.red(e)));
      return;
    }
    if (messages.warnings.length) {
      console.log(chalk.yellow(`warning:`));
      messages.warnings.forEach(w => console.log(chalk.yellow(w)));
    }
  })
  WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOption);
  const devServer = new WebpackDevServer(compiler, devServerOption);
  devServer.listen(port, host, () => {
    console.log(`server is ready...`);
    openBrowser(`${host}:${port}`)
  })
}

runServer(3000, 'localhost');