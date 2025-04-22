// Automatically refreshes access token if expired.

import { ApolloLink, Observable } from '@apollo/client';
import { getAccessToken, setAccessToken } from './tokenService';

export const authLink = new ApolloLink((operation, forward) => {
  return new Observable(observer => {
    let sub: any;
    const handle = async () => {
      const token = getAccessToken();
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      });

      sub = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: async (error) => {
          const isAuthError = error?.message?.includes('jwt expired');
          if (isAuthError) {
            try {
              const res = await fetch('/graphql', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  query: `mutation { refreshAccessToken { token } }`
                }),
              });
              const json = await res.json();
              const newToken = json.data.refreshAccessToken.token;
              setAccessToken(newToken);

              operation.setContext({
                headers: {
                  authorization: `Bearer ${newToken}`,
                },
              });

              forward(operation).subscribe(observer);
            } catch (refreshErr) {
              observer.error(refreshErr);
            }
          } else {
            observer.error(error);
          }
        },
        complete: observer.complete.bind(observer),
      });
    };
    handle();

    return () => sub?.unsubscribe();
  });
});
