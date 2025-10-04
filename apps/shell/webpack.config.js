const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'shell',

  exposes: {
    './Component': './src/app/app.component.ts',
  },

  remotes: {
    header: `http://localhost:4240/remoteEntry.js?v=$1.0.0`,
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
