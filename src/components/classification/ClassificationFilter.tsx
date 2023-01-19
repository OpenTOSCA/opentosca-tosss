import ClassificationBooleanFilter from './filters/ClassificationBooleanFilter'
import ClassificationBooleanListFilter from './filters/ClassificationBooleanListFilter'
import ClassificationDateFilter from './filters/ClassificationDateFilter'
import ClassificationListFilter from './filters/ClassificationListFilter'
import ClassificationNumberFilter from './filters/ClassificationNumberFilter'
import React from 'react'
import {Criterion} from '../../framework/models'

export default React.memo(({criterion, size}: { criterion: Criterion, size?: 'small' | 'medium' }) => {
    return (
        <>
            {criterion.type === 'boolean' && <ClassificationBooleanFilter criterion={criterion} size={size}/>}
            {criterion.type === 'date' && <ClassificationDateFilter criterion={criterion} size={size}/>}
            {criterion.type === 'strings' && <ClassificationBooleanListFilter criterion={criterion} size={size}/>}
            {criterion.type === 'number' && <ClassificationNumberFilter criterion={criterion} size={size}/>}
            {criterion.type === 'string' && <ClassificationListFilter criterion={criterion} size={size}/>}
        </>
    )
})
