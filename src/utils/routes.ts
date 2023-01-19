import Home from '../components/Home'
import PageNotFoundError from '../components/Error'
import Classification from '../components/Classification'
import Questionnaire from '../components/Questionnaire'

type Route = {
    name: string
    path: string
    RouteBody: () => JSX.Element
    getPath?: any
    hidden?: boolean
}

export const routes = {
    home: {
        name: 'Home',
        path: '/',
        RouteBody: Home,
    },

    orchestrators: {
        name: 'Orchestrators',
        path: '/orchestrators',
        RouteBody: Home,
    },

    framework: {
        name: 'Framework',
        path: '/framework',
        RouteBody: Home,
    },

    questionnaire: {
        name: 'Questionnaire',
        path: '/questionnaire',
        RouteBody: Questionnaire,
    },

    classification: {
        name: 'Classification',
        path: '/classification',
        RouteBody: Classification,
    },

    data: {
        name: 'Downloads',
        path: '/downloads',
        RouteBody: Home,
    },

    notFound: {
        name: 'Not Found',
        path: '*',
        RouteBody: PageNotFoundError,
        hidden: true,
    },
}

export const routesArray: Route[] = Object.values(routes)

export default routes
