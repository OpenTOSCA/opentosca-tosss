export type TCriterion = {
    id: string
    name: string
    description: string
    type: 'string' | 'number' | 'boolean' | 'date' | 'strings'
    values: string[]
    hidden_inside_filter?: boolean
    hidden_inside_table?: boolean
    hidden_inside_questionnaire?: boolean
    hidden_inside_framework?: boolean
}

export type TCategory = {
    id: string
    name: string
    criteria: TCriterion[]
}

export type TView = {
    id: string
    name: string
    categories: TCategory[]
}
