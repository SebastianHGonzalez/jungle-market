export interface Config {
  AMQP_URL: string;
  PORT: string | number;
}

export default function getConfig(): Config {
  return {
    AMQP_URL: process.env.AMQP_URL,
    PORT: process.env.PORT || 3000,
  };
}
