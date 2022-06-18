export type EnvironmentType = NodeJS.ProcessEnv["NODE_ENV"];

export type ConfigValues = {
  API_BASE_URL: string
};

export type Config = { [key in EnvironmentType]: ConfigValues };

const environment: EnvironmentType = process.env.NODE_ENV;

const config: Config = {
  development: {
    API_BASE_URL: "http://localhost:3001/api"
  },
  production: {
    API_BASE_URL: "http://localhost:3001/api"
  },
  test: {
    API_BASE_URL: "http://localhost:3001/api"
  }
}

export default config[environment];