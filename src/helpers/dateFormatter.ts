export const dateFormatter = (date: string): string => {
	const dateObj = new Date(date);
	const day = dateObj.getDate();
	const month = dateObj.toLocaleString('en-US', { month: 'long' });
	const year = dateObj.getFullYear();

	const nthNumber = (day: number) => {
		if (day > 3 && day < 21) return 'th';
		switch (day % 10) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	};

	const formattedDate = `${month} ${day}${nthNumber(day)}, ${year}`;

	return formattedDate;
};
