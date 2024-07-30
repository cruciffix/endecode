function Vishiner(key, abc) {
	// Входные тестовые данные, для объяснения примеров в комментах ниже:
	// let abc = "abcdefghijklmnopqrstuvwxyz";
	// let key = "bc";
	// let str = "hello hello";

	// flag = true это для enCode
	// flag = false это deCode
	this.equalizeSymbolsKey = function (arrValues) {
		// Массив, в котором находятся ключи для каждого значение из arrValues т.е.
		// hello => bcbcb, hello => bcbcb -- ["bcbcb", "bcbcb"]
		let arrKey = [];

		// В цикле мы проходимся по значениям из arrValues hello
		for (let i = 0; i < arrValues.length; i++) {
			// Элемент из массива arrValues
			let item = arrValues[i];

			// fullValueKey -- это строка key с равным количеством символов, что и в str
			// str = "hello" key = "bc" => fullValueKey = "bcbcb"
			let fullValueKey = '';

			// Разница между длинной входных данных (str) и ключа шифрования (key)
			let floor = Math.floor(item.length / key.length);

			// Цикл, к-й заполняет, но НЕ ПОЛНОСТЬЮ переменную fullValueKey значением из key
			for (let i = 0; i < floor; i++) fullValueKey += key;

			// Вычисляет сколько осталось символов ввести в переменную fullValueKey
			// чтобы она была заполнена до конца и как нужно т.е. "bcbc" => "bcbcb" --
			// для этого результата не хватает 1 символа (secondNumFromSlice = 1)
			let secondNumFromSlice = item.length - fullValueKey.length;

			// Заисывает в переменную fullValueKey оставшиеся символы
			fullValueKey += key.slice(0, secondNumFromSlice);

			arrKey.push(fullValueKey);
		}

		return arrKey;
	};

	this.enDeCode = function (flag, str) {
		// arrValues -- строка str превращающаяся в массив
		let arrValues = str.split(' '); // ["hello", "hello"]

		// Массив, в котором находятся ключи для каждого значение из arrValues т.е.
		// hello => bcbcb, hello => bcbcb -- ["bcbcb", "bcbcb"]
		let arrKey = this.equalizeSymbolsKey(arrValues); // ["bcbcb", "bcbcb"]
		// console.log(arrValues, arrKey)

		let result = '';

		for (let i = 0; i < arrKey.length; i++) {
			let item = arrKey[i];
			// Тут мы пушим в arrOffsetIndex индексы элементов item т.е. b = 1, c = 2, b = 1, c = 2, b = 1
			let arrOffsetIndex = [];
			for (let i = 0; i < item.length; i++)
				arrOffsetIndex.push(abc.indexOf(item[i]));

			// Тут мы, занимаемся непосредственно шифорванием строки
			// Находим индекс элемента из шифруемой (но пока не зашифрованной) строки
			// Добавляем к ней индекс смещения
			// Создаем шифрованную строку encryptedString

			// encryptedString -- конечная зашифрованная строка
			let encryptedString = '';

			let index = 0;

			let str = arrValues[i];
			// Цикл по входным данным i -- это символ в str
			for (let i of str) {
				// Номера (индексы) символов входной строки (str) в алмфавите (abc)
				let indexValueStr = abc.indexOf(i);

				// Проверка на то, входит ли элемент i в массив abc,
				// если нет, то false
				if (indexValueStr == -1) return str;

				// offsetIndexValue -- это индекс смещения, который складывется из:
				// indexValueStr -- Номера (индексы) символов входной строки (str) в алмфавите (abc)
				// arrOffsetIndex[index++] -- индексы элементов из fullValueKey
				let offsetIndexValue;
				if (flag) {
					offsetIndexValue = indexValueStr + arrOffsetIndex[index++];
					// debugger
				} else {
					offsetIndexValue = indexValueStr - arrOffsetIndex[index++];
					// debugger
				}

				// В алфавите (abc) 24 символа и если индекс смещения элементов offsetIndexValue будет > 24
				// то мы начинаем счет с нуля: 36 - 24 = 12
				if (flag) {
					if (offsetIndexValue > abc.length - 1)
						offsetIndexValue = offsetIndexValue - abc.length;
					// debugger
				} else {
					if (offsetIndexValue < 0)
						offsetIndexValue = abc.length + offsetIndexValue;
					// debugger
				}

				encryptedString += abc[offsetIndexValue];
				// debugger
			}
			result += encryptedString + ' ';
		} // конец цикла for arrKey

		return result.trim();
	};

	this.encode = function (str) {
		return this.enDeCode(true, str);
	};

	this.decode = function (str) {
		return this.enDeCode(false, str);
	};
}
let abc = 'abcdefghijklmnopqrstuvwxyz';
let key = 'bc';

let code = new Vishiner(key, abc);
console.log(code.encode('hellow how r u'));
console.log(code.decode('igmnpy iqx s v'));
