const useLoginController = () => {
  const handleGoogleSignIn = () => {
    const googleOauthUrl =
      'https://accounts.google.com/o/oauth2/v2/auth' +
      '?client_id=' +
      import.meta.env.VITE_GOOGLE_CLIENT_ID +
      '&redirect_uri=' +
      window.location.origin +
      '/callback' +
      '&response_type=token' +
      '&scope=openid email profile';
    window.location.href = googleOauthUrl;
  };

  return {
    handleGoogleSignIn,
  };
};

export default useLoginController;
