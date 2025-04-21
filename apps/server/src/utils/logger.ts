interface Logger {
    info: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
    success: (message: string) => void;
    startup: (message: string) => void;
}

export const logger: Logger = {
    info: (message: string) => console.log(`ℹ️  ${message}`),
    warn: (message: string) => console.warn(`⚠️  ${message}`),
    error: (message: string) => console.error(`❌ ${message}`),
    success: (message: string) => console.log(`✅ ${message}`),
    startup: (message: string) => console.log(`🚀 ${message}`),
};
  