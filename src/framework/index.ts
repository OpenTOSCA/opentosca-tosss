import {TView} from './types';
import {Framework} from './models'
import {validate} from './schema';
import {loadConfig} from '../utils/utils';

const config = loadConfig<TView[]>('framework.yaml')
validate(config)

export default new Framework(config)
