/**
 * Advanced Web Vitals Reporting Script
 * Tracks key performance metrics and sends data to an analytics service or logs to the console.
 */

const ANALYTICS_ENDPOINT = 'https://analytics.example.com/vitals'; // Replace with your actual endpoint

/**
 * Sends performance metrics to an external analytics service.
 * @param {Object} metric - The performance metric object.
 */
const sendToAnalytics = (metric) => {
  try {
    fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metricName: metric.name,
        value: metric.value,
        delta: metric.delta,
        id: metric.id,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      }),
    });
  } catch (error) {
    console.error('❌ Error sending web vitals to analytics:', error);
  }
};

/**
 * Logs performance metrics to the console in a developer-friendly format.
 * @param {Object} metric - The performance metric object.
 */
const logToConsole = (metric) => {
  console.groupCollapsed(`📊 [Web Vitals] ${metric.name}`);
  console.log('Metric ID:', metric.id);
  console.log('Value:', metric.value);
  console.log('Delta:', metric.delta);
  console.log('Entries:', metric.entries);
  console.groupEnd();
};

/**
 * Reports web vitals with environment-based handling for development and production.
 * @param {Function} [onPerfEntry] - Callback function to process performance data.
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals')
      .then(({ getCLS, getFID, getLCP, getFCP, getTTFB, getINP }) => {
        // Collect key web vitals
        getCLS(onPerfEntry);   // Cumulative Layout Shift
        getFID(onPerfEntry);   // First Input Delay
        getLCP(onPerfEntry);   // Largest Contentful Paint
        getFCP(onPerfEntry);   // First Contentful Paint
        getTTFB(onPerfEntry);  // Time to First Byte
        getINP(onPerfEntry);   // Interaction to Next Paint (new metric)
      })
      .catch((error) => {
        console.error('⚠️ Error loading web-vitals library:', error);
      });
  }

  // Automatically log metrics in development, send to analytics in production
  const handleMetric = process.env.NODE_ENV === 'production' ? sendToAnalytics : logToConsole;

  import('web-vitals')
    .then(({ getCLS, getFID, getLCP, getFCP, getTTFB, getINP }) => {
      getCLS(handleMetric);
      getFID(handleMetric);
      getLCP(handleMetric);
      getFCP(handleMetric);
      getTTFB(handleMetric);
      getINP(handleMetric);
    })
    .catch((error) => {
      console.error('❌ Error collecting web vitals:', error);
    });
};

export default reportWebVitals;
