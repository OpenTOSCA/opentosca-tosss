import framework from '../framework'
import {Orchestrators} from './models'
import {TOrchestrator} from './types';
import {loadConfig} from '../utils/utils';
import {validate} from './schema';

const config = loadConfig<TOrchestrator[][]>('classification.yaml')
validate(config)

export default new Orchestrators(framework, config)
