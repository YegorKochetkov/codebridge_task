import React, { ReactNode } from 'react';
import { Box, SxProps } from '@mui/material';

interface ErrorMessageProps {
	error: ReactNode;
}

const errorStyles: SxProps = {
	margin: '2rem',
	padding: '2rem',
	textAlign: 'center',
	border: '1px solid crimson',
	borderRadius: '0.5rem',
};

function ErrorMessage({ error }: ErrorMessageProps) {
	return <Box sx={errorStyles}>{error}</Box>;
}

export default ErrorMessage;
