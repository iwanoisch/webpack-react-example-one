const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const pjson = require('./package.json');


module.exports = env => {
  const folderImages = env.NODE_TYPE

  const g = '\x1b[32m';
  const c = '\x1b[36m';
  const w = '\x1b[0m';
  const y = '\x1b[33m';
  const ly = '\x1b[93m';

  const bg = '\x1b[102m';
  const bw = '\x1b[47m';
  const br = '\x1b[41m';

  const ItalyFlag = `
  ${bg}             ${bw}             ${br}             ${w}
  ${bg}             ${bw}             ${br}             ${w}
  ${bg}             ${bw}             ${br}             ${w}
  ${bg}             ${bw}             ${br}             ${w}
  ${bg}             ${bw}             ${br}             ${w}`
  
  console.log(`
    ${ItalyFlag}
    ${w}


${c}      ██╗    ██╗███████╗████${y}██╗ ██████╗  █████╗  ██████╗██╗${g}██╗    ████████╗███████╗███████╗████████╗
${c}  ██║    ██║██╔════╝██╔══██╗${y}██╔══██╗██╔══██╗██╔════╝██║ ██╔╝${g}  ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝
${c}  ██║ █╗ ██║█████╗  ██████╔╝${y}██████╔╝███████║██║     █████╔╝${g}      ██║   █████╗  ███████╗   ██║   
${c}  ██║███╗██║██╔══╝  ██╔══██╗${y}██╔═══╝ ██╔══██║██║     ██╔═██╗${g}      ██║   ██╔══╝  ╚════██║   ██║   
${c}  ╚███╔███╔╝███████╗██████╔╝${y}██║     ██║  ██║╚██████╗██║  ██╗${g}     ██║   ███████╗███████║   ██║   
${c}  ╚══╝╚══╝ ╚══════╝╚═════╝ ${y}╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ${g}    ╚═╝   ╚══════╝╚══════╝   ╚═╝              
 
 ${w}
 ${c} Country :              ${ly}Italy${w}
 ${c}REACT Version:          ${ly}${pjson.version}${w}
 ${c}UI Version:             ${ly}${pjson.projectConfig[env.NODE_TYPE].version}${w}
 ${c}UI Theme:               ${ly}${pjson.projectConfig[env.NODE_TYPE].theme}${w}
 ${c}Icon:                   ${ly}${pjson.projectConfig[env.NODE_TYPE].module.icon}${w}
 ${c}Mode of dev:            ${ly}${env.NODE_ENV}${w}
    `)

  console.log(`Folder image ${folderImages}`)
  return {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
        chunkFilename: '[id].css'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ESLintPlugin({
        fix: true
      })
    ],
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', // viene utilizzato per verificare la compatibilità per la compatibilità e polyfills per le versioni del browser di uso comune. 
                    {"targets": "defaults" }
                  ],
                  '@babel/preset-react' // gestisce la sintassi JSX che scriveremo nella nostra app React.
                ]
              }
            },
            // { IT WILL BE DEPRECATED eslint-loader INSTEAD USE eslint-webpack-plugin
            //   loader: 'eslint-loader',
            //   options: {
            //     fix: true, // la configurazione eslint-loader che formatterà automaticamente i nostri .js file per conformarci alla guida allo stile di airbnb eslint.  Dopo aver salvato i file, i .jsfile verranno formattati automaticamente per conformarsi alla guida di stile di eslint
            //   }
            // }
          ]
        },
        { // aggiungiamo una nuova regola includendo i due loaders MiniCssExtractPlugine css-loader per gestire l'importazione di css all'interno di file .js come import ./index.css
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // hmr: env.NODE_ENV === 'development', Le opzioni sono ora convalidate in base a regole più rigide: nessuna proprietà aggiuntiva sconosciuta
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1 // opzione che dice a css-loader quanti caricatori caricare prima che venga caricati e consente di configurare quanti caricatori prima css-loadr devono essre applicati alle risorse import @import
              }
            },
            'postcss-loader' // viene caricato prima del css-loader aspetta un file di configurazione postcss.config.jsche si trova nella radice del nostro progetto
          ]
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'), // percorso nostra directory di output in dist
      writeToDisk: false,
      open: true, // indica di aprire una finestra brouwser
      clientLogLevel: 'silent', // in modo che le richieste non siano registrate alla console
      port: 9000, // la porta di localhost
      hot: true
    },
  }
}