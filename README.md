# Firebase & Rollup
## A technical essay

### Outline
1. Firebase includes everything by default
2. In 3.6.6 you can load feature libraries individually
3. CommonJS environments have this easy
4. ES2015 modules can work well too with Rollup.
5. Naked import of feature
6. Use rollup-node-resolve so Rollup can locate node modules.
7. Use rollup-plugin-commonjs to convert commonjs modules to ES2015.
8. Get a slim build.