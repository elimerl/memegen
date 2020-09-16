var assert = require('chai').assert,
	foo = 'bar',
	beverages = {
		tea: ['chai', 'matcha', 'oolong']
	};
it('foo', () => {
	assert.typeOf(foo, 'string'); // without optional message
	assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
	assert.equal(foo, 'bar', 'foo equal `bar`');
	assert.lengthOf(foo, 3, 'foo`s valsue has a length of 3');

})
it('tea', () => {
	assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
})