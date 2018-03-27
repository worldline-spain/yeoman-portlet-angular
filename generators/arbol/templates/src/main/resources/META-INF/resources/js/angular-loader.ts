// Import needed polyfills before application is launched
import './polyfills';

// Declare Liferay AMD loader
declare var Liferay: any;

// Launch application
export default function (rootId: string) {
	Liferay.Loader.require(
		'busqueda-arbol@1.0.0/js/main',
		(main: any) => {
			main.default(rootId);
		});
}