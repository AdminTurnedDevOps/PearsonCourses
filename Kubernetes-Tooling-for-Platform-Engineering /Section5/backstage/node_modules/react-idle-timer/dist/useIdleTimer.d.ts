import type { IIdleTimer } from './types/IIdleTimer';
import type { IIdleTimerProps } from './types/IIdleTimerProps';
/**
 * Creates an IdleTimer instance.
 *
 * @param props Configuration options
 * @returns IdleTimer
 */
export declare function useIdleTimer({ timeout, promptTimeout, promptBeforeIdle, element, events, timers, immediateEvents, onPresenceChange, onPrompt, onIdle, onActive, onAction, onMessage, debounce, throttle, eventsThrottle, startOnMount, startManually, stopOnIdle, crossTab, name, syncTimers, leaderElection, disabled }?: IIdleTimerProps): IIdleTimer;
