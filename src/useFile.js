import { useState, useEffect } from 'react';

const useFile = (file) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const php = await fetch(
          '/upload.php',
          {
            body: file,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            method: 'POST',
          }
        );
        setData(php);
      } catch(error) {
        setError(error);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, [file]);
  if (isLoaded) {
    return {
      data,
      error,
    }
  }
};

export {
  useFile,
};
