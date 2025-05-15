import chalk from "chalk";

const logger = {
  info: (...message: any) => {
    console.log(chalk.blue(`[INFO] ${message}`));
  },
  warn: (...message: any) => {
    console.log(chalk.yellow(`[WARN] ${message}`));
  },
  error: (...message: any) => {
    console.log(chalk.red(`[ERROR] ${message}`));
  },
};

export default logger;
