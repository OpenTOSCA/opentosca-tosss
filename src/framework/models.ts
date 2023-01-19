import {TCategory, TCriterion, TView} from './types'

export class Framework {
    private readonly _raw: TView[]
    private readonly _views: View[]
    private readonly _categories: Category[]
    private readonly _criteria: Criterion[]
    private readonly _filterCriteria: Criterion[]
    private readonly _classificationCriteria: Criterion[]

    constructor(views: TView[]) {
        this._raw = views
        this._views = views.map(view => new View(this, view))
        this._categories = this._views.map(view => view.categories).flat()
        this._criteria = this._views.map(view => view.criteria).flat()
        this._filterCriteria = this._criteria.filter(criterion => !criterion.hiddenInsideFilter)
        this._classificationCriteria = this._criteria.filter(criterion => !criterion.hiddenInsideClassification)
    }

    get raw() {
        return this._raw
    }

    get views() {
        return this._views
    }

    get categories() {
        return this._categories
    }

    get criteria() {
        return this._criteria
    }

    get filterCriteria() {
        return this._filterCriteria
    }

    get classificationCriteria() {
        return this._classificationCriteria
    }
}

export class View {
    private readonly _view: TView
    private readonly _categories: Category[]
    private readonly _criteria: Criterion[]
    private readonly _filterCriteria: Criterion[]
    private readonly _classificationCriteria: Criterion[]
    private readonly _questionnaireCriteria: Criterion[]

    constructor(framework: Framework, view: TView) {
        this._view = view
        this._categories = view.categories.map(category => new Category(this, category))
        this._criteria = this._categories.map(category => category.criteria).flat()
        this._filterCriteria = this._criteria.filter(criterion => !criterion.hiddenInsideFilter)
        this._classificationCriteria = this._criteria.filter(criterion => !criterion.hiddenInsideClassification)
        this._questionnaireCriteria = this._criteria.filter(criterion => !criterion.hiddenInsideQuestionnaire)
    }

    get id() {
        return this._view.id
    }

    get name() {
        return this._view.name
    }

    get categories() {
        return this._categories
    }

    get criteria() {
        return this._criteria
    }

    get filterCriteria() {
        return this._filterCriteria
    }

    get classificationCriteria() {
        return this._classificationCriteria
    }

    get questionnaireCriteria() {
        return this._questionnaireCriteria
    }
}

export class Category {
    private readonly _view: View
    private readonly _category: TCategory
    private readonly _criteria: Criterion[]
    private readonly _filterCriteria: Criterion[]
    private readonly _classificationCriteria: Criterion[]
    private readonly _frameworkCriteria: Criterion[]

    constructor(view: View, category: TCategory) {
        this._view = view
        this._category = category
        this._criteria = category.criteria.map(criterion => new Criterion(this, criterion))
        this._filterCriteria = this._criteria.filter(criterion => !criterion.hiddenInsideFilter)
        this._classificationCriteria = this._criteria.filter(criterion => !criterion.hiddenInsideClassification)
        this._frameworkCriteria = this._criteria.filter(criterion => !criterion.hiddenInsideFramework)
    }

    get view() {
        return this._view
    }

    get id() {
        return this._category.id
    }

    get name() {
        return this._category.name
    }

    get criteria() {
        return this._criteria
    }

    get filterCriteria() {
        return this._filterCriteria
    }

    get classificationCriteria() {
        return this._classificationCriteria
    }

    get frameworkCriteria() {
        return this._frameworkCriteria
    }
}

export class Criterion {
    private readonly _category: Category
    private readonly _criterion: TCriterion

    constructor(category: Category, criterion: TCriterion) {
        this._criterion = criterion
        this._category = category
    }

    get category() {
        return this._category
    }

    get id() {
        return this._criterion.id
    }

    get name() {
        return this._criterion.name
    }

    get description() {
        return this._criterion.description
    }

    get type() {
        return this._criterion.type
    }

    get values() {
        return this._criterion.values
    }

    get hiddenInsideFilter() {
        return this._criterion.hidden_inside_filter
    }

    get hiddenInsideClassification() {
        return this._criterion.hidden_inside_table
    }

    get hiddenInsideQuestionnaire() {
        return this._criterion.hidden_inside_questionnaire
    }

    get hiddenInsideFramework() {
        return this._criterion.hidden_inside_framework
    }
}
