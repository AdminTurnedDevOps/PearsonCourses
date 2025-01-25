import type { ComponentType } from 'react';
import type { IIdleTimer, IIdleTimerProps } from '.';
import type { IEventHandler } from './types/IEventHandler';
import type { PresenceType } from './types/PresenceType';
import React, { Component } from 'react';
/**
 * Higher Order Component (HOC) for adding IdleTimer.
 *
 * @param props IdleTimer configuration.
 * @returns Component wrapped with IdleTimer.
 */
export declare function withIdleTimer<T extends IIdleTimer>(Component: ComponentType<T>): React.ForwardRefExoticComponent<React.PropsWithoutRef<Omit<T, keyof IIdleTimer> & IIdleTimerProps> & React.RefAttributes<IIdleTimer>>;
interface IIdleTimerComponentProps extends IIdleTimerProps {
    setOnPresenceChange?: (fn: (presence: PresenceType) => void) => void;
    setOnPrompt?: (fn: IEventHandler) => void;
    setOnIdle?: (fn: IEventHandler) => void;
    setOnActive?: (fn: IEventHandler) => void;
    setOnAction?: (fn: IEventHandler) => void;
    setOnMessage?: (fn: IEventHandler) => void;
}
declare abstract class IIdleTimerComponent<P, S> extends Component<P, S> {
    /**
     * Function to call when the users presence state changes.
     */
    onPresenceChange?(presence: PresenceType): void;
    /**
     * When promptTimeout is set, this function is called after the user becomes
     * idle. This is useful for displaying a confirm prompt. If the prompt timeout
     * is reached, onIdle is then called.
     */
    onPrompt?(): void;
    /**
     * Function to call when user is idle.
     */
    onIdle?(): void;
    /**
     * Function to call when user becomes active.
     */
    onActive?(event: Event): void;
    /**
     * Function to call on user activity. Can be throttled or debounced using the
     * `throttle` and `debounce` props.
     */
    onAction?(event: Event): void;
    /**
     * Function to call when message is has been emitted.
     */
    onMessage?(data: any): void;
}
export declare class IdleTimerComponent<P = IIdleTimer, S = {}> extends IIdleTimerComponent<P, S> {
    constructor(props: P & IIdleTimerComponentProps);
}
export {};
