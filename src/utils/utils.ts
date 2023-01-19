import Papa from 'papaparse'
import * as yaml from 'js-yaml'

export const isEmptyObject = (obj: any) => {
    if (!obj) return true
    if (!Object.keys(obj).length) return true
    return false
}

export const uniqueValues = (list: any[]) => list.filter((value, index, self) => self.indexOf(value) === index)

export function downloadYAML(name: string, data: any) {
    download(name, 'data:text/yaml;charset=utf-8,', yaml.dump(data))
}

export function downloadJSON(name: string, data: any) {
    download(name, 'data:text/json;charset=utf-8,', JSON.stringify(data, null, 4))
}

export function downloadCSV(name: string, csv: String[][]) {
    download(name, 'data:text/csv;charset=utf-8,', 'sep=,\n' + Papa.unparse(csv))
}

export function download(name: string, type: string, data: string) {
    const element = document.createElement('a')
    element.setAttribute('href', type + encodeURIComponent(data))
    element.setAttribute('download', name)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

export function loadConfig<T>(file: string) {
    const request = new XMLHttpRequest();
    request.open('GET', process.env.PUBLIC_URL + '/config/' + file, false);  // `false` makes the request synchronous
    request.send(null);

    if (request.status !== 200) throw new Error(`Could not load file "${file}"`)
    const data = request.responseText

    if (file.endsWith('.yaml')) return yaml.load<T>(request.responseText)
    if (file.endsWith('.json')) return JSON.parse(request.responseText)

    return data
}
