async function waitFor(call, condition, ms) {
    let result = await call();
    const timeout = Date.now() + ms;
    while (!condition(result) && Date.now() < timeout) {
        result = await call();
        await sleep(1000);
    }

    if (!condition(result)) {
        return Promise.reject(new Error('Timeout Error'));
    }
    
    return result;
}

const sleep = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export default waitFor;
