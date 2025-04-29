import { useMutation } from '@apollo/client';
import { UPDATE_USER_PROFILE } from '../graphql/user/mutations';

export const useUpdateUserProfile = () => useMutation(UPDATE_USER_PROFILE);

