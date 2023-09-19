import {LoggerService} from "@nestjs/common";

export class LoggersService implements LoggerService {

  log(message: any, ...optionalParams: any[]) {
    console.log(`LOG:${JSON.stringify(message)}`)
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(`ERROR:${JSON.stringify(message)}`)
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(`WARN:${JSON.stringify(message)}`)
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.log(`DEBUG:${JSON.stringify(message)}`)
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(`VERBOSE:${JSON.stringify(message)}`)
  }
}
