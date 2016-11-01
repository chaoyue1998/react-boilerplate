import shell from 'shelljs';
import webpack from 'webpack';
import path from "path";
import config from "./config";
import webpackConfig from "./webpack.prod.config.js";

const betaPath = path.join(config.betaRoot, config.projectName);
const releasePath = path.join(config.wwwRoot, config.projectName);
var assetsPath = process.env.NODE_ENV === "production"
  ? releasePath
  : betaPath;

shell.rm('-rf', assetsPath)
shell.mkdir('-p', assetsPath)

webpack(webpackConfig, function(err, stats) {
  if (err)
    throw err;
  process.stdout.write(stats.toString({colors: true, modules: false, children: false, chunks: false, chunkModules: false}) + '\n');
});
