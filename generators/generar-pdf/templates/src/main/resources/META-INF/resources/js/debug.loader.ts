/**
 * Angular loader only used in development by local web server.
 *
 * This file emulates what Liferay achieves using 'angular-loader.ts',
 * invoking main object with the name/selector of the root
 * node to bootstrap main component (AppComponent) in it.
 */

// Import all necessary CSS files letting Webpack load them all
// and their fonts.
// Import all required CSS you already import in:
// /src/main/resources/META-INF/resources/view.jsp
import 'font-awesome/css/font-awesome.min.css';
import 'primeng-wl/resources/themes/omega/theme.css';
import 'primeng-wl/resources/primeng.min.css';
import '../css/main.css';

// Bootstrap default component using same 'main' as Liferay
// but using a known root node in index.html: <demo-app></demo-app>
// See gulpfile.js to check dynamically generated index.html file.
import { default as main } from './main';
main('demo-app');
