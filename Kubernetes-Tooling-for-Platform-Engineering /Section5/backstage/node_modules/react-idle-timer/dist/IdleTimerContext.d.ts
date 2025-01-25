import React, { PropsWithChildren } from 'react';
import type { IIdleTimer, IIdleTimerProps } from '.';
/**
 * IdleTimer Context.
 */
export declare const IdleTimerContext: React.Context<IIdleTimer>;
/**
 * Provider for adding IdleTimer to Children.
 *
 * @param props  IdleTimer configuration
 * @returns Component wrapped with IdleTimer
 */
export declare function IdleTimerProvider(props?: PropsWithChildren<IIdleTimerProps>): import("react/jsx-runtime").JSX.Element;
/**
 * Context consumer for using IdleTimer API within jsx.
 *
 * @returns IdleTimer context consumer
 */
export declare const IdleTimerConsumer: React.Consumer<IIdleTimer>;
/**
 * Context getter for IdleTimer Provider.
 *
 * @returns IdleTimer API
 */
export declare function useIdleTimerContext(): IIdleTimer;
