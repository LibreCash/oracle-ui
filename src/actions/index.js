export const [ 
	STARTUP,

	// internal
	MASTRERNODES_LIST_UPDATED,

	// network
  START_WEBSOCKET,
  STOP_WEBSOCKET,

	// masternode recv
	MASTER_CONNECTED,
	MASTER_DISCONNECTED,
	MASTER_STATE,
	NODES_LIST,
	NODE_ADDED,
	NODE_REMOVED,
	NODE_OP_DONE,
	EVENTS,

	NOTIFICATION,

	// masternode send
	ADD_NODE,
	REMOVE_NODE,
	NODE_OP,

] = [
	'STARTUP',
	'MASTRERNODES_LIST_UPDATED',
  'START_WEBSOCKET',
  'STOP_WEBSOCKET',
	'MASTER_CONNECTED',
	'MASTER_DISCONNECTED',
	'MASTER_STATE',
	'NODES_LIST',
	'NODE_ADDED',
	'NODE_REMOVED',
	'NODE_OP_DONE',
	'EVENTS',
	'NOTIFICATION',
	'ADD_NODE',
	'REMOVE_NODE',
	'NODE_OP',
]

export const startup = payload => ({
	type: STARTUP,
	payload
})

export const addNode = payload => ({
	type: ADD_NODE,
	payload
})

export const removeNode = payload => ({
	type: REMOVE_NODE,
	payload
})

/*export const pong = payload => ({
	type: 'SEND_MESSAGE',
	event: 'pong',
	payload
})*/

export const initConnection = payload => ({
	type: 'SEND_MESSAGE',
	event: 'initConnection',
	payload
})

export const nodeOp = payload => ({
	type: 'SEND_MESSAGE',
	event: 'nodeOp',
	payload
})

export const masterOn = payload => ({
	type: 'SEND_MESSAGE',
	event: 'masterOn',
	payload
})

export const startWebsocket = payload => ({
	type: 'START_WEBSOCKET',
	payload
})

export const stopWebsocket = payload => ({
	type: 'STOP_WEBSOCKET',
	payload
})

export const masternodesListUpdated = payload => ({
	type: 'MASTRERNODES_LIST_UPDATED',
	payload
})
