import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  modulePathIgnorePatterns: ["<rootDir>/client/", "<rootDir>/build/"]
};

export default config;
