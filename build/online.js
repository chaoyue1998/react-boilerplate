import shell from 'shelljs';
import path from "path";
import config from "./config";

const betaPath = path.join(config.betaRoot, config.projectName);
const releasePath = path.join(config.wwwRoot, config.projectName);

shell.rm('-rf', releasePath);
shell.mkdir('-p', releasePath);
shell.cp('-R', betaPath, config.wwwRoot);
