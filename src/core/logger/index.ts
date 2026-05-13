/* eslint-disable @typescript-eslint/no-explicit-any */
type LogLevel = "info" | "error" | "success" | "warn" | "debug";

export class Logger {
  private static readonly colors: Record<LogLevel, string> = {
    info: "\x1b[36m",
    error: "\x1b[31m",
    success: "\x1b[32m",
    warn: "\x1b[33m",
    debug: "\x1b[35m",
  };

  private static format(level: LogLevel, message: string): string {
    const timestamp = new Date().toLocaleTimeString();
    const color = this.colors[level];
    const label = level.toUpperCase();

    return `[${timestamp}] ${color}${label} | ${message}`;
  }

  private static send(level: LogLevel, message: string, payload?: any) {
    const header = this.format(level, message);

    if (!payload) {
      console.log(header);
      return;
    }

    console.log(header, payload);
  }

  static info(m: string, p?: any) {
    this.send("info", m, p);
  }

  static error(m: string, p?: any) {
    this.send("error", m, p);
  }

  static success(m: string, p?: any) {
    this.send("success", m, p);
  }

  static warn(m: string, p?: any) {
    this.send("warn", m, p);
  }

  static debug(m: string, p?: any) {
    this.send("debug", m, p);
  }
}
