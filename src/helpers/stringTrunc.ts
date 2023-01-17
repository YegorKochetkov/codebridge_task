export const stringTrunc = (string: string, length: number): string => {
	if (string.length <= length) return string;

	const truncString = string.substring(0, length) + '...';

	return truncString;
};
