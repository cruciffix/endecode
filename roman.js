let symbolRoman = {
	1: 'I',
	4: 'IV',
	5: 'V',
	9: 'IX',
	10: 'X',
	40: 'XL',
	50: 'L',
	90: 'XC',
	100: 'C',
	400: 'CD',
	500: 'D',
	900: 'CM',
	1000: 'M',
};
// Среверсировали ключи в symbolRoman [1000, 900, 500...]
let symbolRomanReverseKey = Object.keys(symbolRoman).reverse();

// Переменная, в которую будут записаны римские цифры
let str = '';

// Переменная, в которую будут записаны числа
let counter = 0;

class RomanNumerals {
	static toRoman(num) {
		let counter = num;
		// Проходим по циклу с реверсивными ключами [1000, 900, 500...]
		for (let key of symbolRomanReverseKey) {
			let numberKey = Number(key);
			if (counter == 1) {
				str += 'I';
				return str;
			} else if (counter >= numberKey) {
				str += symbolRoman[numberKey];
				counter -= numberKey;
				this.toRoman(counter);
			} else {
				continue;
			}
			break;
		}
		return str;
	}

	static fromRoman(str) {
		let newArr = str.split('');
		let num = 0;
		for (let symbol in symbolRoman) {
			newArr.forEach(element => {
				if (element == symbolRoman[symbol]) {
					num += Number(symbol);
				}
			});
		}

		return num;
	}
}
