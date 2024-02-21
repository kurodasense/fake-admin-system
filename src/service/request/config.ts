let BASE_URL: string = "";
let TIME_OUT: number = 10000;

if (process.env.NODE_ENV == "development") {
  BASE_URL = "http://123.207.32.32:8000";
  TIME_OUT = 10000;
} else if (process.env.NODE_ENV == "production") {
  BASE_URL = "http://123.207.32.32:8000";
  TIME_OUT = 10000;
} else {
  BASE_URL = "http://123.207.32.32:8000";
  TIME_OUT = 10000;
}

export { BASE_URL, TIME_OUT };
