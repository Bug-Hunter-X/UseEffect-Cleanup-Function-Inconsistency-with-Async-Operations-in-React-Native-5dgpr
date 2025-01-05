```javascript
import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setController(controller);

    const fetchData = async () => {
      try {
        const response = await fetch('someUrl', { signal: controller.signal });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
      console.log('Cleanup function called');
    };
  }, []);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
};

export default MyComponent;
```