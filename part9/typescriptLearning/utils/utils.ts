export const extractArguments = (args: string[]) => {
    const processedArgs = [];
    for (let i = 2; i < args.length; i++) {
        const arg: string = args[i];
        if (!isNaN(Number(arg))) {
            processedArgs.push(parseFloat(arg));
        } else {
            processedArgs.push(arg);
        }
    }
    return processedArgs;
};