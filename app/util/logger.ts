
import { loggingService } from '../service';

export enum LogLevel {
  VERBOSE,
  INFO,
  WARN,
  ERROR,
  FATAL,
}

export class ApplicationLogger {
  constructor(private tag: string) { }

  public log(level: LogLevel, msg: string, err?: Error | string) {
    loggingService.writeLogEntry(`[${LogLevel[level]}][${new Date()}][${this.tag}] ${msg}${err ? err.toString() : ''}`);
  }

  public verbose(msg: string, err?: Error | string) { this.log(LogLevel.VERBOSE, msg, err); }
  public info(msg: string, err?: Error | string) { this.log(LogLevel.INFO, msg, err); }
  public warn(msg: string, err?: Error | string) { this.log(LogLevel.WARN, msg, err); }
  public error(msg: string, err?: Error | string) { this.log(LogLevel.ERROR, msg, err); }
  public fatal(msg: string, err?: Error | string) { this.log(LogLevel.FATAL, msg, err); }
}

export const getLogger = (tag: string) => new ApplicationLogger(tag);
export const logger = getLogger('default');
