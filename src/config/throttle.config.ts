import { plugins } from 'restify';

const config: plugins.ThrottleOptions = {
  burst: 10, // Max 10 concurrent requests (if tokens)
  ip: true, // throttle per IP
  rate: 0.5, // Steady state: 1 request / 2 seconds
};

export default config;
