import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

type Config = {
	mecabBin?: string;
	mecabDic?: string;
};

export default function (): Config {
	const path = `${__dirname}/../config.yml`;
	try {
		const config = yaml.safeLoad(readFileSync(path, 'utf-8'));
		return config as Config;
	} catch (e) {
		throw `Cannot load config ${path} ${e}`;
	}
}
