import React from 'react'

import { Table } from 'react-bootstrap'

export function tickersNetToChart(tickers) {
    var data = []
    try {
        tickers.forEach((ticker) => {
          data.push({
            date: new Date(ticker.timestamp),
            open: ticker.low,
            high: ticker.high,
            low: ticker.low,
            close: ticker.high,
            volume: ticker.volume
          })
        })
	} catch (e) {
		console.log(e)
	}
    return data
}

export function renderObjectProps(object, exclude = []) {
	if (!object)
		return <div>renderObjectProps: object is null</div>

    if (typeof object === 'string') {
        return 
            <Table striped bordered condensed hover>
                <tbody>
                    <tr>
                        <td>{object}</td>
                    </tr>
                </tbody>
            </Table>
    }

    var fields = []
    for (let [k, field] of Object.entries(object)) {
      if (exclude.indexOf(k) == -1)
        fields.push(
        	<tr>
	        	<td>{k}</td>
	        	<td>{JSON.stringify(field)}</td>
	        </tr>
        )
	}
    return (
    	<Table striped bordered condensed hover>
    		<tbody>
    			{fields}
    		</tbody>
    	</Table>)
}

export function renderObjectPropsRecursive(object, exclude = []) {
    return _renderObjectPropsRecursive('', [], object, exclude)
}

export function _renderObjectPropsRecursive(name, s, object, exclude = [], excludeObjects = []) {
    if (excludeObjects.indexOf(name) != -1)
        return s
    s.push(<div>{name}</div>)
    s.push(renderObjectProps2(name, object, exclude))
    if (object !== null && typeof object === 'object') {
        for (let [k, field] of Object.entries(object)) {
            if (field !== null && typeof field === 'object') {
                var f = name != '' ? `${name}.${k}` : k
                _renderObjectPropsRecursive(f, s, object[k], exclude)
            }
        }
    }
    return s
}

export function renderObjectProps2(name, object, exclude = []) {
    if (!object)
        return <div>renderObjectProps2: object is null</div>

    if (typeof object === 'string')
        return <div>{`"${object}"`}</div>

    var fields = []
    for (let [k, field] of Object.entries(object)) {
        // skip objects
        if (field !== null && typeof field === 'object')
            continue

        var f = name != '' ? `${name}.${k}` : k
        if (exclude.indexOf(f) != -1)
            continue

        fields.push(
            <tr>
                <td>{k}</td>
                <td>{JSON.stringify(field)}</td>
            </tr>
        )
    }
    return (
        <Table striped bordered condensed hover>
            <tbody>
                {fields}
            </tbody>
        </Table>)
}

