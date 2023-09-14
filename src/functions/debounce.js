export default function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);
        console.log('args', args)

        timeoutId = setTimeout(() => {
            func()
        }, delay);
    };
}