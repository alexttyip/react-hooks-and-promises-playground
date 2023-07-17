// I was hoping to use httpbin.org but it seems to be down
const slowPromise = () =>
  new Promise((resolve) => {
    console.log("start of promise");

    setTimeout(() => {
      resolve("promise resolved");
    }, 1000);
  });

export const slowClient = async () => {
  // const response = await fetch('http://localhost/delay/1');
  // const data = await response.text();
  // console.log('slowClient done')

  const resolved = await slowPromise();

  return resolved;
};
