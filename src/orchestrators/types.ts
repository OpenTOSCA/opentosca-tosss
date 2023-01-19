export type TOrchestrator = {
    general: TGeneralCategory
} &  {[key: string]: {[key: string]: any}}

export type TGeneralCategory = {
    id: string
    orchestrator: string
    website: string
    repository: string
} &  {[key: string]: any}

export enum BOOLEAN_FILTER {
    TRUE,
    NOT_APPLICABLE,
    FALSE,
}

export enum OPERATION_FILTER {
    AND,
    OR,
    NOT,
}

export const NOT_APPLICABLE = 'Not Applicable'
