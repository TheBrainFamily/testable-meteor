import Fiber from 'fibers';

export default function inFiber(callback) {
  return async function () {
    await runInFiber(callback);
  };
}

function runInFiber(functionToRun) {
  return new Promise((resolve) => {
    Fiber(() => {
      functionToRun();
      resolve();
    }).run();
  });
}
