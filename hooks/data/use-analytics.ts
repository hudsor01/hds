import va from '@vercel/analytics';

type EventOptions = {
  name: string;
  properties?: Record<string, string | number | boolean>;
};

export function useAnalytics() {
  const trackEvent = ({name, properties}: EventOptions) => {
    va.track(name, properties);
  };

  return {trackEvent};
}
