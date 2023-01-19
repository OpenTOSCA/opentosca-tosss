import Ajv from 'ajv';
import framework from '../framework';
import {NOT_APPLICABLE} from './types';

const schema = (() => {
    return {
        type: 'array',
        items: {
            type: 'object',
            properties: framework.categories.reduce((categories, category) => {

                categories[category.id] = {
                    type: 'object',
                    properties: category.criteria.reduce((criteria, criterion) => {
                        let properties = {}

                        if (criterion.type === 'string') properties = {type: 'string'}
                        if (criterion.type === 'boolean') properties = {enum: [true, false, NOT_APPLICABLE]}
                        if (criterion.type === 'number') properties = {type: 'integer'}
                        if (criterion.type === 'date') properties = {
                            type: 'string',
                            pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}'
                        }
                        if (criterion.type === 'strings') properties = {
                            type: 'array',
                            items: criterion.values ? {enum: criterion.values} : {type: 'string'}
                        }
                        if (criterion.values && criterion.type !== 'strings') properties = {enum: criterion.values}

                        criteria[criterion.id] = properties
                        return criteria
                    }, {}),
                    required: category.criteria.map(criterion => criterion.id),
                    additionalProperties: false
                }

                return categories

            }, {}),
            required: framework.categories.map(category => category.id),
            additionalProperties: false
        },
    }
})()

export function validate(data: any) {
    console.log(data)
    console.log(schema)

    const _validate = new Ajv().compile(schema)
    if (_validate(data)) return

    console.error(_validate.errors)
    throw new Error('Orchestrators configuration file is not valid')
}
