import { Resolver } from 'awilix';

interface DependencyInjection extends DIFB.FilesDI {}

declare module 'awilix' {
	export interface AwilixContainer {
		cradle: DependencyInjection;
	}
}
