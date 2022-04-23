module.exports = new (class {
	/**
	 * @param {number} number
	 * @returns {string}
	 */
	numberToCurrency(number) {
		return new Intl.NumberFormat('ko-KR', {
			style: 'currency',
			currency: 'KRW',
		}).format(number);
	}
})();
