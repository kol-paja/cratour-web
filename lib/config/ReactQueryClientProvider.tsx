'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
		},
	},
});

type Props = {
	children: React.ReactNode;
};

function ReactQueryClientProvider({ children }: Props) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
}

export default ReactQueryClientProvider;
