const getTimestamp = () => {
    const date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  
  return  DATE_UTILS = {
    getTimestamp,
  };