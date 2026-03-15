interface RequestConfig {
  url: string;
  timeout: number;
  retries: number;
}

// set the default
function createConfig(url: string): RequestConfig {
  const d = new Date();
  let x = 3000; // timeout
  return {
    url: url,
    timeout: x,
    retries: 3,
  };
}
