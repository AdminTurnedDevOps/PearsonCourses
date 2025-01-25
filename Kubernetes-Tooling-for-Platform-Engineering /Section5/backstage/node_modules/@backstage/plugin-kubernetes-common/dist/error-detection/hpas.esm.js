import { detectErrorsInObjects } from './common.esm.js';

const hpaErrorMappers = [
  {
    detectErrors: (hpa) => {
      if ((hpa.spec?.maxReplicas ?? -1) === hpa.status?.currentReplicas) {
        return [
          {
            type: "hpa-max-current-replicas",
            message: `Current number of replicas (${hpa.status?.currentReplicas}) is equal to the configured max number of replicas (${hpa.spec?.maxReplicas ?? -1})`,
            severity: 8,
            sourceRef: {
              name: hpa.metadata?.name ?? "unknown hpa",
              namespace: hpa.metadata?.namespace ?? "unknown namespace",
              kind: "HorizontalPodAutoscaler",
              apiGroup: "autoscaling/v2"
            },
            occurrenceCount: 1
          }
        ];
      }
      return [];
    }
  }
];
const detectErrorsInHpa = (hpas) => detectErrorsInObjects(hpas, hpaErrorMappers);

export { detectErrorsInHpa };
//# sourceMappingURL=hpas.esm.js.map
