import Ajv from 'ajv'

const schema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            id: {type: 'string'},
            name: {type: 'string'},
            categories: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {type: 'string'},
                        name: {type: 'string'},
                        criteria: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {type: 'string'},
                                    name: {type: 'string'},
                                    description: {type: 'string'},
                                    type: {
                                        enum: ['string', 'number', 'boolean', 'date', 'strings']
                                    },
                                    values: {
                                        type: 'array',
                                        items: {
                                            type: 'string'
                                        }
                                    },
                                    hidden_inside_filter: {type: 'boolean'},
                                    hidden_inside_table: {type: 'boolean'},
                                    hidden_inside_questionnaire: {type: 'boolean'},
                                    hidden_inside_framework: {type: 'boolean'},
                                },
                                required: ['id', 'name', 'description', 'type'],
                                additionalProperties: false,
                            }
                        },
                    },
                    required: ['id', 'name', 'criteria'],
                    additionalProperties: false,
                }
            },
        },
        required: ['id', 'name', 'categories'],
        additionalProperties: false
    }
}


export function validate(data: any) {
    const _validate = new Ajv().compile(schema)
    if (_validate(data)) return

    console.error(_validate.errors)
    throw new Error('Framework configuration file is not valid')
}
