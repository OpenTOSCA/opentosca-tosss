import {BOOLEAN_FILTER, NOT_APPLICABLE, OPERATION_FILTER, TOrchestrator} from './types'
import {ClassificationBooleanFilterState} from '../components/classification/filters/ClassificationBooleanFilter'
import {ClassificationNumberFilterState} from '../components/classification/filters/ClassificationNumberFilter'
import {ClassificationDateFilterState} from '../components/classification/filters/ClassificationDateFilter'
import {ClassificationListFilterState} from '../components/classification/filters/ClassificationListFilter'
import {
    ClassificationBooleanListFilterState
} from '../components/classification/filters/ClassificationBooleanListFilter'
import {isEmptyObject} from '../utils/utils'
import {Criterion, Framework} from '../framework/models'
import {FilterState, HiddenState} from '../store/filter'

export class Orchestrators {
    private readonly _data: Orchestrator[]
    private readonly _json: TOrchestrator[]
    private readonly _csv: String[][]

    constructor(framework: Framework, orchestrators: TOrchestrator[]) {
        this._json = orchestrators
        this._data = orchestrators.map(orchestrator => new Orchestrator(framework, orchestrator))

        const headers: string[] = []
        const rows = orchestrators.map((entry, index) => {
            const row: any[] = []
            for (const category in entry) {
                for (const criterion in entry[category]) {
                    if (index === 0) headers.push(`${category}__${criterion}`)
                    row.push(entry[category][criterion])
                }
            }
            return row
        })
        this._csv = [headers, ...rows]
    }

    get data() {
        return this._data
    }

    get json() {
        return this._json
    }

    get csv() {
        return this._csv
    }

    filter(filterState: FilterState): HiddenState {
        if (isEmptyObject(filterState)) return {}

        const hiddenState: HiddenState = {}
        this._data.forEach(orchestrator => {
            if (!orchestrator.filter(filterState)) {
                hiddenState[orchestrator.data.general.id] = true
            }
        })

        return hiddenState
    }
}

export class Orchestrator {
    private readonly _data: TOrchestrator
    private readonly _framework: Framework

    constructor(framework: Framework, data: TOrchestrator) {
        this._data = data
        this._framework = framework
    }

    get data() {
        return this._data
    }

    getValue(criterion: Criterion) {
        return this._data[criterion.category.id][criterion.id]
    }

    filter(filterState: FilterState) {
        for (const criterion of this._framework.criteria) {
            if (isEmptyObject(filterState[criterion.category.id])) continue

            const filter = filterState[criterion.category.id][criterion.id]
            if (filter === null || filter === undefined) continue

            let pass = true
            const value = this.getValue(criterion)

            if (criterion.type === 'boolean') {
                pass = this.filterForBoolean(value, filter)
            }

            if (criterion.type === 'number') {
                pass = this.filterForNumber(value, filter)
            }

            if (criterion.type === 'date') {
                pass = this.filterForDate(value, filter)
            }

            if (criterion.type === 'string') {
                pass = this.filterForList([value], filter)
            }

            if (criterion.type === 'strings') {
                pass = this.filterForBooleanList(value, filter)
            }

            if (!pass) {
                return false
            }
        }

        return true
    }

    private filterForBoolean(value: boolean | string, filter: ClassificationBooleanFilterState) {
        if (BOOLEAN_FILTER.TRUE === filter) return value === true
        if (BOOLEAN_FILTER.FALSE === filter) return value === false || value === NOT_APPLICABLE
        return false
    }

    private filterForNumber(value: number, filter: ClassificationNumberFilterState) {
        return filter[0] <= value && value <= filter[1]
    }

    private filterForDate(value: string, filter: ClassificationDateFilterState) {
        const date = new Date(new Date(value).toDateString())
        return (filter[0] ? new Date(filter[0]) <= date : true) && (filter[1] ? date <= new Date(filter[1]) : true)
    }

    private filterForList(values: string[], filter: ClassificationListFilterState) {
        if (filter.operation === OPERATION_FILTER.AND) {
            return filter.values.every(value => values.includes(value))
        }

        if (filter.operation === OPERATION_FILTER.OR) {
            return filter.values.some(value => values.includes(value))
        }

        if (filter.operation === OPERATION_FILTER.NOT) {
            return !filter.values.some(value => values.includes(value))
        }

        return false
    }

    private filterForBooleanList(values: string[], filter: ClassificationBooleanListFilterState) {
        return this.filterForBoolean(values.length > 0, filter.boolean) && this.filterForList(values, filter)
    }
}
