// const reportWebVitals = onPerfEntry => {
//   if (onPerfEntry && onPerfEntry instanceof Function) {
//     import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
//       getCLS(onPerfEntry);
//       getFID(onPerfEntry);
//       getFCP(onPerfEntry);
//       getLCP(onPerfEntry);
//       getTTFB(onPerfEntry);
//     });
//   }
// };

// export default reportWebVitals;






// const reportWebVitals = (onPerfEntry) => {
//   if (onPerfEntry && onPerfEntry instanceof Function) {
//     import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
//       getCLS(onPerfEntry);
//       getFID(onPerfEntry);
//       getLCP(onPerfEntry);
//     });
//   }
// };

// export default reportWebVitals;






/**
 * This script collects and logs the performance metrics for web vitals.
 * It tracks key web performance metrics and sends them to a logging or analytics endpoint.
 */

// Utility function to send performance data to an analytics service
const sendToAnalytics = (metric) => {
  const analyticsEndpoint = 'https://analytics.example.com/vitals'; // Replace with actual endpoint
  fetch(analyticsEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      metric: metric.name,
      value: metric.value,
      delta: metric.delta,
      id: metric.id,
    }),
  }).catch((error) => {
    console.error('Error sending web vitals to analytics:', error);
  });
};

/**
 * Function to report web vitals.
 * Metrics can be logged to the console or sent to an analytics service.
 * @param {Function} onPerfEntry - Callback function to process performance data.
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Importing the web-vitals library dynamically for performance optimization
    import('web-vitals')
      .then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
        // Performance metrics collection
        getCLS(onPerfEntry); // Cumulative Layout Shift
        getFID(onPerfEntry); // First Input Delay
        getLCP(onPerfEntry); // Largest Contentful Paint
        getFCP(onPerfEntry); // First Contentful Paint (optional)
        getTTFB(onPerfEntry); // Time to First Byte (optional)

        // You can add other metrics collection here as needed, such as FID, LCP, etc.
      })
      .catch((error) => {
        console.error('Error loading web-vitals library:', error);
      });
  }

  // Optional: Send the data to an analytics endpoint for real-time monitoring
  if (process.env.NODE_ENV === 'production') {
    import('web-vitals')
      .then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
        // Send the collected metrics to analytics
        getCLS(sendToAnalytics);
        getFID(sendToAnalytics);
        getLCP(sendToAnalytics);
        getFCP(sendToAnalytics);
        getTTFB(sendToAnalytics);
      })
      .catch((error) => {
        console.error('Error sending web vitals to analytics:', error);
      });
  }
};

export default reportWebVitals;
