import { KubeConfig } from './config';
export interface Usage {
    cpu: string;
    memory: string;
}
export interface ContainerMetric {
    name: string;
    usage: Usage;
}
export interface PodMetric {
    metadata: {
        name: string;
        namespace: string;
        selfLink?: string;
        creationTimestamp: string;
        labels?: {
            [key: string]: string;
        };
    };
    timestamp: string;
    window: string;
    containers: ContainerMetric[];
}
export interface NodeMetric {
    metadata: {
        name: string;
        selfLink?: string;
        creationTimestamp: string;
        labels?: {
            [key: string]: string;
        };
    };
    timestamp: string;
    window: string;
    usage: Usage;
}
export interface PodMetricsList {
    kind: 'PodMetricsList';
    apiVersion: 'metrics.k8s.io/v1beta1';
    metadata: {
        selfLink: string;
    };
    items: PodMetric[];
}
export interface NodeMetricsList {
    kind: 'NodeMetricsList';
    apiVersion: 'metrics.k8s.io/v1beta1';
    metadata: {
        selfLink: string;
    };
    items: NodeMetric[];
}
export interface SinglePodMetrics extends PodMetric {
    kind: 'PodMetrics';
    apiVersion: 'metrics.k8s.io/v1beta1';
}
export interface SingleNodeMetrics extends NodeMetric {
    kind: 'NodeMetrics';
    apiVersion: 'metrics.k8s.io/v1beta1';
}
export interface MetricsOptions {
    /**
     * restrict the list of returned objects by labels
     */
    labelSelector?: string;
}
export declare class Metrics {
    private config;
    constructor(config: KubeConfig);
    getNodeMetrics(options?: MetricsOptions): Promise<NodeMetricsList>;
    getNodeMetrics(node: string, options?: MetricsOptions): Promise<SingleNodeMetrics>;
    getPodMetrics(options?: MetricsOptions): Promise<PodMetricsList>;
    getPodMetrics(namespace?: string, options?: MetricsOptions): Promise<PodMetricsList>;
    getPodMetrics(namespace: string, name: string, options?: MetricsOptions): Promise<SinglePodMetrics>;
    private metricsApiRequest;
}
