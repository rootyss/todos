const getAuthErrorText = (authError) => {
  switch (authError) {
    case 'auth/wrong-password':
      return 'Некорректный пароль';
    case 'auth/email-already-in-use':
      return 'Адрес электронной почты уже используется';
    case 'auth/network-request-failed':
      return 'Превышено число запросов';
    default:
      return 'Неизвестная ошибка';
  }
};

export default getAuthErrorText;
