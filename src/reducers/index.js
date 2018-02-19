import { combineReducers } from 'redux'

import { 
  STARTUP,
  MASTRERNODES_LIST_UPDATED,
  START_WEBSOCKET,
  STOP_WEBSOCKET,
  MASTER_CONNECTED,
  MASTER_DISCONNECTED,
  MASTER_STATE,
  NODES_LIST,
  NODE_ADDED,
  NODE_REMOVED,
  NODE_OP_DONE,
  EVENTS,
  NOTIFICATION
} from '../actions'

// todo: remove ctx, refactor state.ctx -> state

const INITIAL_STATE = {
	ctx: { 
		connected: false,

		secret: null,

		masternodes: [],

		master: {
			state: {
				id: -1,
				lastUpdate: null,
				lightNodesAlive: -1,
				startTime: null,
				uptime: -1,
			},
			notifications: []
		},

		lightNodes: [],
		lightNodesNotifications: {}

	}
}

const startupReducer = (state = INITIAL_STATE, action) => {
//	console.log('REDUCER0', action, state)
	switch (action.type) {
		case STARTUP:
			return {
				...state,
				ctx: {
					...state.ctx
				}
			}
		case MASTRERNODES_LIST_UPDATED:
			return {
				...state,
				ctx: {
					...state.ctx,
					masternodes: action.payload
				}
			}
		case START_WEBSOCKET:
			return {
				...state,
				ctx: {
					...state.ctx,
					secret: action.payload
				}
			}
		case STOP_WEBSOCKET:
			return {
				...state,
				ctx: {
					...state.ctx,
					secret: null
				}
			}
		case MASTER_CONNECTED:
			return {
				...state,
				ctx: {
					...state.ctx,
					connected: true
				}
			}
		case MASTER_DISCONNECTED:
			return {
				...state,
				ctx: {
					...state.ctx,
					connected: false
				}
			}
		case MASTER_STATE:
			return {
				...state,
				ctx: {
					...state.ctx,
					master: {
						...state.ctx.master,
						state: action.payload
					}
				}
			}
		case NODES_LIST:
			// map notifications
			var lightNodesNotifications = {}
			for (var i in action.payload) {
				var node = action.payload[i]
				lightNodesNotifications[node.id] = lightNodesNotifications[node.id] || []
			}
			return {
				...state,
				ctx: {
					...state.ctx,
					lightNodes: action.payload,
					lightNodesNotifications
				}
			}
		case NOTIFICATION:
			// map notifications
			var lightNodesNotifications = state.ctx.lightNodesNotifications
			if (action.payload.code == 'LIGHTNODE_NOTIFICATION') {
				var notification = action.payload.object[0]
				var id = notification.masterNodeId
				lightNodesNotifications = {
					...lightNodesNotifications,
					[id]: [
						...(lightNodesNotifications[id] ? lightNodesNotifications[id] : []),
						notification
					]
				}
				return {
					...state,
					ctx: {
						...state.ctx,
						lightNodesNotifications
					}
				}
			}
			return {
				...state,
				ctx: {
					...state.ctx,
					master: {
						...state.ctx.master,
						notifications: [
							...state.ctx.master.notifications,
							action.payload
						]
					},
					lightNodesNotifications
				}
			}
		default:
			return state
	}
}

const reducer = combineReducers({
  startupReducer
})

export default reducer
