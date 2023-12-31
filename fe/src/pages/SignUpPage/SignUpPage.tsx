import { useReducer, useEffect, useState } from 'react';
import * as S from './SignUpPageStyle';
import { Layout, TextInput, Button, AlertModal } from '@components/commons';
import { formReducer } from '@services/signUp/signUp';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '@services/signUp/signUp';

export interface FormDataState {
  id: { enteredId: string; isValid: boolean | null; isTouched: boolean };
  password: { enteredPassword: string; isValid: boolean | null; isTouched: boolean };
  nickName: { enteredNickName: string; isValid: boolean | null; isTouched: boolean };
}

export interface Action {
  type: string | null;
  payload: string;
}

const initialFormState: FormDataState = {
  id: { enteredId: '', isValid: null, isTouched: false },
  password: { enteredPassword: '', isValid: null, isTouched: false },
  nickName: { enteredNickName: '', isValid: null, isTouched: false },
};

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, dispatch] = useReducer<(state: FormDataState, action: Action) => FormDataState>(
    formReducer,
    initialFormState,
  );
  const [formDataIsValid, setFormDataIsValid] = useState(false);

  const {
    id: { enteredId: enteredId, isValid: idIsValid, isTouched: idIsTouched },
    password: {
      enteredPassword: enteredPassword,
      isValid: passwordIsValid,
      isTouched: passwordIsTouched,
    },
    nickName: {
      enteredNickName: enteredNickName,
      isValid: nicknameIsValid,
      isTouched: nicknameIsTouched,
    },
  } = formData;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormDataIsValid(!!(idIsValid && passwordIsValid && nicknameIsValid));
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [formData]);

  const idChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'INPUT_ID', payload: event.target.value });
  };

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'INPUT_PASSWORD', payload: event.target.value });
  };

  const nicknameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'INPUT_NICKNAME', payload: event.target.value });
  };

  const backBtnClickHandler = () => {
    navigate('/');
  };

  const signUpBtnClickHandler = async () => {
    try {
      await signUpUser(enteredId, enteredPassword, enteredNickName);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout isHeader={true} previousPage="홈으" onClick={backBtnClickHandler}>
        <S.SignUpPage>
          <S.TitleImg />
          <S.ProjectLogo />
          <S.ContentsSection>
            <S.ContentDescription>
              회원 가입으로 올해 내 컷을 기록하고, 공유하고, 다시 볼 수 있어요.
            </S.ContentDescription>
            <S.InputSection>
              <TextInput
                label="아이디"
                placeholder="영어 소문자, 숫자, 특수기호 -,_ 포함 5~20자"
                value={enteredId}
                onChange={idChangeHandler}
                alertText={
                  !idIsValid &&
                  idIsTouched &&
                  '* 영어 소문자, 숫자, 특수기호 -,_ 포함 5~20자여야 해요.'
                }
              />
              <TextInput
                label="패스워드"
                placeholder="영어 소문자, 숫자, 특수기호 -,_ 포함 5~20자"
                type="password"
                value={enteredPassword}
                onChange={passwordChangeHandler}
                alertText={
                  !passwordIsValid &&
                  passwordIsTouched &&
                  '* 영어 소문자, 숫자, 특수기호 -,_ 포함 5~20자여야 해요.'
                }
              />
              <TextInput
                label="닉네임"
                placeholder="영어, 한글, 숫자로 3~9자"
                value={enteredNickName}
                onChange={nicknameChangeHandler}
                alertText={
                  !nicknameIsValid &&
                  nicknameIsTouched &&
                  '* 영어 소문자, 숫자, 특수기호 -,_ 포함 5~20자여야 해요.'
                }
              />
            </S.InputSection>
            <Button
              title="회원가입"
              size="large"
              state={formDataIsValid ? 'default' : 'inactive'}
              onClick={signUpBtnClickHandler}
            />
            <S.TermsOfService>
              계속 진행하면 올해 내 컷{' '}
              <S.Link href="https://www.naver.com" target="_blank" rel="noopener noreferrer">
                서비스 이용약관
              </S.Link>{' '}
              및{' '}
              <S.Link href="https://www.naver.com" target="_blank" rel="noopener noreferrer">
                개인정보처리방침
              </S.Link>{' '}
              동의한 것으로 간주됩니다.
            </S.TermsOfService>
          </S.ContentsSection>
        </S.SignUpPage>
      </Layout>
      <AlertModal title="아이디" message="비번" hasCancelBtn={false} buttonName="확인" />
    </>
  );
};
