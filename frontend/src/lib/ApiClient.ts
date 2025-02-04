import { getSession } from 'next-auth/react';
import { api } from './axios';

const ApiClient = () => {

  const instance = api;

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();

    if (session) {

      request.headers.Authorization = `Bearer ${session.tokenAccess}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      throw error
    },
  );

  return instance;
};

export default ApiClient();