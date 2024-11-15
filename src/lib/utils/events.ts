type EventHandler<E extends Event = Event, T extends EventTarget = Element> = (
	event: E & { currentTarget: EventTarget & T }
) => any;

// 定义所有修饰符的类型
type EventModifiers = "once" | "preventDefault" | "stopPropagation" | "passive" | "nonpassive" | "capture" | "trusted";

// 使用类型映射来为 EventHandler 添加修饰符属性
type EventHandlerWithModifiers<E extends Event = Event, T extends EventTarget = Element> = EventHandler<E, T> & {
    [K in EventModifiers]: EventHandlerWithModifiers;
};

interface EventHandlerOptions {
    once: boolean;
    preventDefault: boolean;
    stopPropagation: boolean;
    passive: boolean;
    nonpassive: boolean;
    capture: boolean;
    trusted: boolean;
}

export function handler<E extends Event = Event, T extends EventTarget = Element>(handler: EventHandler<E, T>): EventHandlerWithModifiers<E, T>{
    const options: EventHandlerOptions = {
        once: false,
        preventDefault: false,
        stopPropagation: false,
        passive: false,
        nonpassive: false,
        capture: false,
        trusted: false,
    };

    const proxy = new Proxy(handler, {
        get(target, prop) {
            if (prop in options) {
                // 动态设置每个修饰符
                (options as any)[prop] = true;
                return proxy;
            }
            return Reflect.get(target, prop);
        },
        apply(target, thisArg, args) {
            const event = args[0] as Event;

            options.preventDefault && event.preventDefault();
            options.stopPropagation && event.stopPropagation();
            /*
            if (options.trusted && !event.isTrusted) {
                // 如果要求事件必须是可信的（由用户触发的事件），但当前事件不是可信的，就不处理
                return;
            }
            */

            target.apply(thisArg, args as any);

            if (options.once) {
                // 如果是只执行一次，确保删除该事件处理程序
                event.currentTarget?.removeEventListener(event.type, proxy as EventListener, {
                    capture: options.capture,
                });
            }
        },
    });

    return proxy as EventHandlerWithModifiers<E, T>;
}
