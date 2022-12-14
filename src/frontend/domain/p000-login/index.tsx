import './index.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RiEyeLine, RiEyeOffLine, RiLockLine, RiUserLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { helperI18Next, helperTime } from 'universal-helper';
import * as yup from 'yup';

import { getMethodStoreGlobal } from '../../global/store';
import { getMethodStoreGlobalPersist } from '../../global/store/persist';
import initI18N from './i18n';

const testUser = 't@t.com';
const testPassword = 'testtest1234';

const sI18nDomainName = 'login';
const I18N: helperI18Next.TypeI18NDomain = initI18N({ name: sI18nDomainName });

const schema = yup.object({
  username: yup.string().required('validate.required').email('validate.email'),
  password: yup
    .string()
    .required('validate.required')
    .min(4, { key: 'validate.min', option: { count: 4 } }),
});

const JSX = () => {
  const { t, i18n } = useTranslation([sI18nDomainName]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: 'onChange' });

  const { setLoading } = getMethodStoreGlobal();
  const { setUserData } = getMethodStoreGlobalPersist();

  const navigate = useNavigate();

  const firebaseLogin = async (sEmail: string, sPassword: string) => {
    setLoading(true);
    await helperTime.WaitForMilliSecond(300);
    setLoading(false);

    if (sEmail != testUser) {
      setError('username', {
        type: 'custom',
        message: 'validate.userNotFound',
      });
      return;
    }

    if (sPassword == 'global') {
      setError('global', {
        type: 'custom',
        message: 'validate.networkRequestFailed',
      });
      return;
    }

    if (sPassword != testPassword) {
      setError('password', {
        type: 'custom',
        message: 'validate.passwordWrong',
      });
      return;
    }

    console.log('sign in');
    setUserData({});
    navigate('/user/dashboard');
  };

  const onSubmit = async (data: any) => {
    await firebaseLogin(data.username, data.password);
  };

  const [isShowPassword, setIsShowPassword] = useState(false);
  const onClickShowPassword = () => {
    setIsShowPassword((state) => !state);
  };

  return (
    <div className="HScreen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="RSU">
        <div className="HScreen container w-sm max-w-full mx-auto flex flex-col justify-center">
          <div className="text-center font-medium text-gray-500 text-7xl">
            Boilerplate
          </div>
          {/* <select
              onChange={(event: any) => i18n.changeLanguage(event.target.value)}
              value={i18n.language}
            >
              <option value="en">EN</option>
              <option value="th">TH</option>
            </select> */}
          <div className="mt-7 flex flex-row justify-center gap-x-2 text-xl">
            <input
              type="radio"
              name="EN"
              value="en"
              checked={i18n.language === 'en'}
              onChange={() => i18n.changeLanguage('en')}
            />
            EN
            <input
              type="radio"
              name="TH"
              value="th"
              checked={i18n.language === 'th'}
              onChange={() => i18n.changeLanguage('th')}
            />
            TH
          </div>

          <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-none mx-auto max-w-lg ">
              <div
                className={
                  'rounded w-full bg-white border-1 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none ' +
                  (errors.username || errors.global ? 'border-2 border-red-500' : '')
                }
              >
                <div className="py-0.5 divide-x-2 flex divide-gray-300 pr-2">
                  <div className="flex-none w-10 my-auto pb-0.5">
                    <RiUserLine color="DimGray" size="1.2em" className="block m-auto" />
                  </div>
                  <input
                    {...register('username')}
                    placeholder={t('form.username.placeholder') || ''}
                    type="email"
                    className="flex-1 text-xl h-10 text-gray-600 pl-2 pt-1 placeholder-gray-400 focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none "
                  />
                </div>
              </div>
              {errors.username && (
                <div className="h-5 mt-2 text-left text-red-500">
                  {helperI18Next.MappingObject(errors.username.message, t)}
                </div>
              )}
              <div
                className={
                  'mt-2 rounded w-full bg-white border-1 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none ' +
                  (errors.password || errors.global ? 'border-2 border-red-500' : '')
                }
              >
                <div className="py-0.5 divide-x-2 flex divide-gray-300">
                  <div className="flex-none w-10 my-auto pb-0.5">
                    <RiLockLine color="DimGray" size="1.2em" className="block m-auto" />
                  </div>
                  <input
                    placeholder={t('form.password.placeholder') || ''}
                    {...register('password')}
                    type={isShowPassword ? 'text' : 'password'}
                    /* block py-2 */
                    className="flex-1 text-xl h-10 text-gray-600 pl-2 pt-1 placeholder-gray-400 focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                  />
                  <div
                    className="flex-none w-10 my-auto pb-0.5"
                    onClick={onClickShowPassword}
                  >
                    {isShowPassword && (
                      <RiEyeOffLine
                        color="DimGray"
                        size="1.2em"
                        className="block m-auto"
                      />
                    )}
                    {!isShowPassword && (
                      <RiEyeLine color="DimGray" size="1.2em" className="block m-auto" />
                    )}
                  </div>
                </div>
              </div>
              {errors.password && (
                <div className="h-5 mt-2 text-left text-red-500">
                  {helperI18Next.MappingObject(errors.password.message, t)}
                </div>
              )}
              {errors.global && (
                <div className="h-5 mt-2 text-left text-red-500">
                  {helperI18Next.MappingObject(errors.global.message, t)}
                </div>
              )}
              <button
                disabled={!isDirty || !isValid}
                type="submit"
                className="mt-7 text-3xl font-medium
                w-full text-white rounded
                px-6 py-3 block  bg-primary shadow-xl hover:bg-primary-hover
                disabled:text-gray-300
                disabled:bg-gray-500"
              >
                {t('form.login')}
              </button>
            </div>
          </form>
          <div className="mt-5 text-xl grid grid-cols-2">
            <div>User : {testUser}</div>
            <div>Password : {testPassword}</div>
            <div>Test Globel Error</div>
            <div>Password : global</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default { I18N, JSX };
