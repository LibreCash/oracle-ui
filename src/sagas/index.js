/* es____lint no-console: ["error", { allow: ["warn", "error", "tron"] }] */

import { take, all, put, call, apply, fork, race, cancelled, takeEvery, takeLatest } from 'redux-saga/effects'
import { eventChannel, END, delay } from 'redux-saga'

import openSocket from 'socket.io-client'
import jwt from 'jsonwebtoken'

import { 
  STARTUP,

  MASTER_CONNECTED,
  MASTER_DISCONNECTED,
  MASTER_STATE,

  NODES_LIST,

  NOTIFICATION

} from '../actions'

import config from '../config/config'

var JWT_PROFILE = config.jwt.profile
var JWT_TOKEN
// = jwt.sign(config.jwt.profile, config.jwt.secret, {})

function createWebSocketConnection(options) {
	JWT_TOKEN = jwt.sign(JWT_PROFILE, options.secret, {})
	const socket = openSocket(options.url);
	return socket
}

function createSocketChannel(socket) {
	return eventChannel(emit => {
		var authenticated = false

		const pingHandler = (event) => {
	      event && emit({ 
	      	type: MASTER_CONNECTED, 
	      	payload: event.payload 
	      })
//	      console.log(event)
	    }
	    socket.on('connect', (e) => {
			socket.emit('authenticate', {token: JWT_TOKEN})
	    })

	    socket.on('disconnect', (e) => {
	      authenticated = false
	      emit({ 
	      	type: MASTER_DISCONNECTED, 
	      	payload: null
	      })
	    })

		socket.on('ping', pingHandler)

		socket.on('message', (e) => {
			if (!authenticated) {
				console.log('Not authenticated')
				return
			}
			var type
			var payload
			switch(e.event) {
				case 'state':
					type = MASTER_STATE
					payload = e.state
					break
				case 'lightNodes':
					type = NODES_LIST
					payload = e.nodes
					break
				case 'notification':
					type = NOTIFICATION
					payload = e.notification
					break
				default:
					return
			}
	      emit({ 
	      	type: type,
	      	payload: payload
	      })
		})

        socket.on('authenticated', function () {
          authenticated = true
        })

		socket.on('error', (e) => {
          console.log('Error socket.io: ', e)
		})

//		socket.emit('authenticate', {token: JWT_TOKEN})

		const unsubscribe = () => {
	      socket.off('ping', pingHandler)
    	}

    	return unsubscribe
	})
}

function* pong(socket) {
  yield apply(socket, socket.send, [{ event: 'pong' }]) // call `emit` as a method with `socket` as context
}

export function* externalListener(socketChannel) {
  while (true) {
    const event = yield take(socketChannel)
//    yield apply(console, console.log, ['EVENT::::', event])
    yield put(event);
  }
}

function* internalListener(socket) {
  while (true) {
    const event = yield take('SEND_MESSAGE')
    yield apply(socket, socket.send, [event]) 
  }
}

function* wsHandling() {
  while (true) {
  const data = yield take('START_WEBSOCKET');
	const socket = yield call(createWebSocketConnection, data.payload)
	const socketChannel = yield call(createSocketChannel, socket)
    const { cancel } = yield race({
      task: [
      	call(externalListener, socketChannel), 
      	call(internalListener, socket)
      ],
      cancel: take('STOP_WEBSOCKET')
    });
    if (cancel) {
      socketChannel.close();
    }
  }
}

export function* startup() {
	yield call(delay, 1000)
}

export default function* rootSaga() {
	yield all([
		fork(startup),
		fork(wsHandling)
	])
}
