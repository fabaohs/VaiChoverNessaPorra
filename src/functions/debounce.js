export default function debounce(func, delay) {
    let timerId;
    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
}