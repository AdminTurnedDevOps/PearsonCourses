declare class Broker {
    static readonly WEB_SOCKET_CONNECT_MAGIC_ID = "1hpzW-zo2z-o8io-gfmV1-2cb1d82";
    static readonly DEFAULT_WEB_SOCKET_PORT = 16322;
    static readonly DEFAULT_SECURE_WEB_SOCKET_PORT = 16324;
    static readonly DEFAULT_WAITING_TIME: number;
    private _publisherMap;
    private _webClientMap;
    private _webSocketServer?;
    private _secureWebSocketServer?;
    private _tmpSubscriberShelter;
    private _scheduleJob;
    constructor();
    get hasPublishers(): boolean;
    private _startWsServer;
    private _takeAction;
    private _addPublisher;
    private _updatePublisher;
    private _fetchTypes;
    private _addDynamicRemote;
    private _addSubscriber;
    private _removeSubscriber;
    private _removePublisher;
    private _addWebClient;
    private _notifyWebClient;
    private _addTmpSubScriberRelation;
    private _getTmpSubScribers;
    private _consumeTmpSubScribers;
    private _clearTmpSubScriberRelation;
    private _clearTmpSubScriberRelations;
    private _disconnect;
    private _setSchedule;
    private _clearSchedule;
    private _stopWhenSIGTERMOrSIGINT;
    private _handleUnexpectedExit;
    start(): Promise<void>;
    exit(): void;
    broadcast(message: unknown): void;
}

declare function getBroker(): Broker | undefined;

export { getBroker };
