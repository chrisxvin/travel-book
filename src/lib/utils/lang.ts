export const preventDefault = <T extends Event>(func: Action1<T>) => {
    const newHandler = (event: T) => {
        event.preventDefault();
        event.stopPropagation();
        func(event);
    }

    return newHandler;
};
