
export const waitFor = async <T>(call: () => Promise<T>, condition: (input: T) => boolean, ms: number): Promise<T> => {
    let result: T = await call();
    const timeout: number = Date.now() + ms;
    while (condition(result) && Date.now() < timeout) {
        result = await call();
        await sleep(1000);
    }

    if (!condition(result)) {
        return Promise.reject(new Error("Timeout Error"));
    }
    return result;
};

const sleep = async (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
