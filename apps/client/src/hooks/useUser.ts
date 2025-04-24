import { useQuery, useMutation } from '@apollo/client';
import { ME_QUERY } from '../graphql/user/queries';
import { REGISTER_USER, LOGIN_USER } from '../graphql/user/mutations';

export const useMe = () => useQuery(ME_QUERY);

export const useRegister = () => useMutation(REGISTER_USER);
export const useLogin = () => useMutation(LOGIN_USER);
