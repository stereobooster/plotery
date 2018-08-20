import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/plotery.js',
	external: ['preact'],
	plugins: [
		resolve({ extensions: ['.js', '.jsx'] }),
		babel({ exclude: 'node_modules/**' }),
		terser({
			ecma: 6,
			module: true,
			mangle: {
				toplevel: true
			},
			compress: {
				passes: 2,
				unsafe: true
			}
		})
	],
	output: [
		{
			file: 'dist/plotery.js',
			format: 'cjs',
			sourcemap: true
		}, {
			file: 'dist/plotery.es.js',
			format: 'es',
			sourcemap: true
		}
	]
};
